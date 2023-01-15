
        "use strict";
        let bodyLockStatus = true;
        function menuInit() {
            if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
                if (bodyLockStatus && e.target.closest(".icon-menu")) document.documentElement.classList.toggle("menu-open");
            }));
        }
        const lazyMedia = new LazyLoad({
			elements_selector: '[data-src],[data-srcset]',
			class_loaded: '_lazy-loaded',
			use_native: true
		});
        
        tippy('[data-tippy-content]', {});

        const aSwiper = new Swiper('.author__slider', {
			slidesPerView: 1,
			spaceBetween: 30,
			autoHeight: false,
			speed: 1800,
			parallax: true,
			loop: true,
			lazy: true,
			autoplay: {
				delay: 10000,
				disableOnInteraction: false,
			},
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},

		});
        function isWebp() {
            
            function testWebP(callback) {
                let webP = new Image();
                webP.onload = webP.onerror = function () {
                    callback(webP.height == 2);
                };
                webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
            }
            
            testWebP(function (support) {
                let className = support === true ? 'webp' : 'no-webp';
                document.documentElement.classList.add(className);
            });
        }

        let addWindowScrollEvent = false;
        function headerScroll() {
            addWindowScrollEvent = true;
            const header = document.querySelector("header.header");
            const headerShow = header.hasAttribute("data-scroll-show");
            const headerShowTimer = header.dataset.scrollShow ? header.dataset.scrollShow : 500;
            const startPoint = header.dataset.scroll ? header.dataset.scroll : 1;
            let scrollDirection = 0;
            let timer;
            document.addEventListener("windowScroll", (function(e) {
                const scrollTop = window.scrollY;
                clearTimeout(timer);
                if (scrollTop >= startPoint) {
                    !header.classList.contains("_header-scroll") ? header.classList.add("_header-scroll") : null;
                    if (headerShow) {
                        if (scrollTop > scrollDirection) header.classList.contains("_header-show") ? header.classList.remove("_header-show") : null; else !header.classList.contains("_header-show") ? header.classList.add("_header-show") : null;
                        timer = setTimeout((() => {
                            !header.classList.contains("_header-show") ? header.classList.add("_header-show") : null;
                        }), headerShowTimer);
                    }
                } else {
                    header.classList.contains("_header-scroll") ? header.classList.remove("_header-scroll") : null;
                    if (headerShow) header.classList.contains("_header-show") ? header.classList.remove("_header-show") : null;
                }
                scrollDirection = scrollTop <= 0 ? 0 : scrollTop;
            }));
        }
        setTimeout((() => {
            if (addWindowScrollEvent) {
                let windowScroll = new Event("windowScroll");
                window.addEventListener("scroll", (function(e) {
                    document.dispatchEvent(windowScroll);
                }));
            }
        }), 0);
        const script_elements = document.querySelectorAll(".anim");
        function onEntry(entry) {
            entry.forEach((change => {
                if (change.isIntersecting) setTimeout((() => {
                    change.target.classList.add("show");
                }), 300);
            }));
        }
        let options = {
            threshold: [ .1 ]
        };
        let observer = new IntersectionObserver(onEntry, options);
        for (let elm of script_elements) observer.observe(elm);
        "use strict";
        const htmlBlock = document.documentElement;
        const saveUserTheme = localStorage.getItem("user-theme");
        function windowLoad() {
            let userTheme;
            if (window.matchMedia && (userTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")) document.querySelector(".daynight").classList.add("dark" === userTheme ? "_icon-sun" : "_icon-moon");
            window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e => {
                !saveUserTheme ? changeTheme() : null;
            }));
            const themeButton = document.querySelector(".theme-changer");
            if (themeButton) themeButton.addEventListener("click", (function(e) {
                e.preventDefault();
                changeTheme(true);
            }));
            function setThemeClass() {
                if (saveUserTheme) htmlBlock.classList.add(saveUserTheme); else htmlBlock.classList.add(userTheme);
            }
            setThemeClass();
            function changeTheme(saveTheme = false) {
                const currentTheme = htmlBlock.classList.contains("light") ? "light" : "dark";
                const newTheme = "light" === currentTheme ? "dark" : "light";
                htmlBlock.classList.remove(currentTheme);
                htmlBlock.classList.add(newTheme);
                if (saveTheme) localStorage.setItem("user-theme", newTheme);
                document.querySelector(".daynight").classList.toggle("_icon-moon");
                document.querySelector(".daynight").classList.toggle("_icon-sun");
            }
        }
        window.addEventListener("load", windowLoad);
        function loadData() {
            return new Promise(((resolve, reject) => {
                setTimeout(resolve, 200);
            }));
        }
        loadData().then((() => {
            let preloaderEl = document.getElementById("preloader");
            if (preloaderEl) {
                preloaderEl.classList.add("hidden");
                preloaderEl.classList.remove("visible");
            }
        }));
        
        menuInit();
        headerScroll();
