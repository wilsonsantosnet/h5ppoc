import { Component, OnInit, ViewChild, Output, EventEmitter, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, FormGroup, FormControl, NgModel } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SampleDashService } from './sampledash.service';
import { ViewModel } from '../../common/model/viewmodel';
import { GlobalService, NotificationParameters } from '../../global.service';
import { ComponentBase } from '../../common/components/component.base';
import { Subscription } from 'rxjs';

declare var $: any;
declare var H5PStandalone: any;
declare var H5P : any;

@Component({
  selector: 'app-sampledash',
  templateUrl: './sampledash.component.html',
  styleUrls: ['./sampledash.component.css'],
})
export class SampleDashComponent extends ComponentBase implements OnInit, OnDestroy {

  vm: ViewModel<any>;
  changeCultureEmitter: Subscription;
  result: any;
  show: any;

  constructor(private sampleDashService: SampleDashService, private router: Router, private ref: ChangeDetectorRef) {

    super();
    this.vm = null;
    this.show = true;
  
  }

  ngOnInit() {

    this.vm = this.sampleDashService.initVM();
    this.updateCulture();

    this.sampleDashService.detectChanges(this.ref);

    this.changeCultureEmitter = GlobalService.getChangeCultureEmitter().subscribe((culture: any) => {
      this.updateCulture(culture);
    });

   
    this.setup();

    H5P.externalDispatcher.on('xAPI',(event) => {
      
      if (event.data.statement.result) {

        console.log(event.data.statement);
        console.log(this.result);

        if (event.data.statement.result.success) {
          this.result = {
            success: "Você Acertou"
          }
          this.sampleDashService.save("active", event.data.statement.result).subscribe((response) => {
            console.log(response);
          })
        }
        else {
          this.result = {
            success: "Você Errou"
          }
        }
        this.show = false;
      }

    })

  }

  setup() {

    const { H5P } = H5PStandalone;
    const i = new H5P(document.getElementById('h5p-container'), '/assets/h5p/workspace/quem-e-o-melhor',
      {
        id: '100',
        frameJs: '/assets/h5p/frame.bundle.js',
        frameCss: '/assets/h5p/styles/h5p.css'
      },
      {
        frame: false,
        copyright: false,
        embed: false,
        download: false,
        icon: true,
        export: false
      }
    );
  }

  updateCulture(culture: string = null) {
    this.sampleDashService.updateCulture(culture).then((infos: any) => {
      this.vm.infos = infos;
      this.vm.grid = this.sampleDashService.getInfoGrid(infos);
    });
  }

  ngOnDestroy() {
    this.changeCultureEmitter.unsubscribe();
  }

}
