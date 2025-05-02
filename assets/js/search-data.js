// get the ninja-keys element
// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{id: "post-u-s-reciprocal-tariffs-a-cge-analysis-of-global-economic-impacts",
        
          title: "U.S. Reciprocal Tariffs: A CGE Analysis of Global Economic Impacts",
        
        description: "Standard GTAP CGE simulation of the 2025 U.S. reciprocal tariff measures",
        section: "Blogs",
        handler: () => {
          
            window.location.href = "/blog/2025/us-asean-cge-static/";
          
        },
      },{id: "post-u-s-reciprocal-tariff-measures-monitoring-2025",
        
          title: "U.S. Reciprocal Tariff Measures Monitoring (2025)",
        
        description: "Interactive visualization of U.S. reciprocal tariff policies implemented in 2025",
        section: "Blogs",
        handler: () => {
          
            window.location.href = "/blog/2025/us-reciprocal-tariff-measures/";
          
        },
      },{id: "news-trump-s-25-tariff-on-canda-and-mexico",
          title: 'Trump’s 25% Tariff on Canda and Mexico',
          description: "",
          section: "News",},{id: "news-gtapviz-r-package-for-gtap-result-visualization-in-development",
          title: 'GTAPViz R Package for GTAP Result Visualization: In Development',
          description: "",
          section: "News",},{id: "news-successfully-completed-the-gtap-dynamic-short-course-3-month-program",
          title: 'Successfully completed the GTAP Dynamic Short Course (3-month program).',
          description: "",
          section: "News",},{id: "news-harplus-r-package-for-har-and-sl4-data-extraction-available-on-cran",
          title: 'HARplus R Package for ‘har’ and ‘sl4’ data extraction: Available on CRAN',
          description: "",
          section: "News",},{id: "news-gtapviz-gtap-result-visualization-package-now-officially-on-cran",
          title: 'GTAPViz: GTAP Result Visualization Package Now Officially on CRAN!',
          description: "",
          section: "News",},{id: "projects-amata-production-product-catalog-polo",
          title: 'AMATA Production Product Catalog (Polo)',
          description: "Discover AMATA Production&#39;s custom polo shirts — designed for corporate identity, teams, and uniforms. Tailored to your brand with premium fabrics, clean embroidery, and modern sublimation printing. Fast production and factory-direct value.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/AMATAPoloCatalog/";
            },},{id: "projects-amata-production-co-ltd-thailand",
          title: 'AMATA Production Co., Ltd., Thailand',
          description: "AMATA Production Co., Ltd., a business specializing in high-quality apparel, printing solutions, and smart business tools with precision and innovation.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/AMATAProduction/";
            },},{id: "projects-amata-production-product-catalog-sports",
          title: 'AMATA Production Product Catalog (Sports)',
          description: "Explore our sportswear collection from AMATA Production — custom-designed sublimation shirts for teams, events, and organizations. Factory-direct pricing, modern styles, and fast turnaround with top-tier print quality.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/AMATASportsCatalog/";
            },},{id: "projects-gtapviz-r-package",
          title: 'GTAPViz: R Package',
          description: "Facilitates the reporting of CGE model outputs, particularly for GTAP users, but it can also be applied to other results based on &#39;har&#39; and &#39;sl4&#39; file.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/GTAPViz/";
            },},{id: "projects-harplus-r-package",
          title: 'HARplus: R Package',
          description: "Officially available on CRAN, HARplus enhances GEMPACK users&#39; experience by streamlining &#39;har&#39; and &#39;sl4&#39; file processing for multiple inputs simultaneously.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/HARplus/";
            },},{id: "projects-u-s-reciprocal-tariff-measures-2025",
          title: 'U.S. Reciprocal Tariff Measures (2025)',
          description: "An interactive visualization of Trump’s 2025 reciprocal tariffs and U.S. trade shares using global descriptive trade data.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/USReciprocalTariffVisual/";
            },},{id: "projects-cge-u-s-trade-war",
          title: 'CGE: U.S. Trade War',
          description: "Using GTAP CGE to analyze Trump’s 2025 reciprocal tariffs on global and country economy, illustrating with interactive visualization.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/USTariffCGE_1/";
            },},{
        id: 'social-email',
        title: 'Email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%70%70%75%61%6E%67%63%68@%70%75%72%64%75%65.%65%64%75", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/bodysbobb", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/pattawee-puangchit", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=_PHCgeIAAAAJ", "_blank");
        },
      },{
        id: 'social-work',
        title: 'Work',
        section: 'Socials',
        handler: () => {
          window.open("https://gtap.agecon.purdue.edu/network/member_display.asp?UserID=37552", "_blank");
        },
      },{
        id: 'social-amata',
        title: 'Amata',
        section: 'Socials',
        handler: () => {
          window.open("https://bodysbobb.github.io/projects/AMATAProduction/", "_blank");
        },
      },];