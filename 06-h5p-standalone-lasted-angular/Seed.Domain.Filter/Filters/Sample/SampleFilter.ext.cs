using System;

namespace Seed.Domain.Filter
{
    public class SampleFilter  : SampleFilterBase
    {
        public SampleFilter()
        {
            this.ByCache = true;
            this.CacheExpiresTime = TimeSpan.FromMinutes(5);
        }

    }
}
