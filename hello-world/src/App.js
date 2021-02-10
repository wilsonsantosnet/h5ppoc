import React, { Component } from 'react';

class App extends Component {
    
	
		
	render() {
	
		const url = 'https://wilson1.h5p.com/content/1291243329770023447/embed'

		const handleContentRef = dom => {
			if (dom) {
			  dom.onload = () => {
				dom.contentWindow.H5P.externalDispatcher.on('xAPI', function(event) {
				  console.log('INITIAL STATEMENT ON externalDispatcher')
				  console.log(event.data.statement)
				})
			  }
		}};			
		
        return (
           <iframe
			  title='h5p-embed'
			  src={url}
			  ref={handleContentRef}
			  frameBorder='0'
			  width="1088" height="637" 
			  allowFullScreen="allowfullscreen" 
			  allow="geolocation *; microphone *; camera *; midi *; encrypted-media *"
			/>
        );
    }
}

export default App;