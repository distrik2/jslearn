function slider() {
    const slides = document.querySelectorAll(".offer__slide");
    const offerSlider = document.querySelector(".offer__slider");
    const next = document.querySelector(".offer__slider-next");
    const prev = document.querySelector(".offer__slider-prev");
    const currentSlide = document.querySelector("#current");
    const totalSlide = document.querySelector("#total");
    const slidesWrapper = document.querySelector(".offer__slider-wrapper");
    const slidesField = document.querySelector(".offer__slider-inner");
    const width = window.getComputedStyle(slidesWrapper).width;

    let index = 1;
    let offset = 0;

    if (slides.length < 10) {
        totalSlide.textContent = `0${slides.length}`;
        currentSlide.textContent = `0${index}`;
    } else {
        totalSlide.textContent = slides.length;
        currentSlide.textContent = index;
    }

    slidesField.style.width = 100 * slides.length + "%";
    slidesField.style.display = "flex";
    slidesField.style.transition = "0.5s all";

    slidesWrapper.style.overflow = "hidden";

    slides.forEach(item => {
        item.style.width = width;
    });

    offerSlider.style.position = "relative";

    function dotsForeach() {
        dots.forEach(dot => dot.style.opacity = ".5");
        dots[index - 1].style.opacity = 1;
    }

    function checkCurSlides() {
        if (slides.length < 10) {
            currentSlide.textContent = `0${index}`;
        } else {
            currentSlide.textContent = index;
        }
    }

    const indecators = document.createElement("ol");
    const dots = [];
    indecators.classList.add("carousel-indicators");
    indecators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    offerSlider.append(indecators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement("li");
        dot.setAttribute("data-slide-to", i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indecators.append(dot);
        dots.push(dot);
    }


    next.addEventListener("click", (e) => {
        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (index == slides.length) {
            index = 1;
        } else {
            index++;
        }

        checkCurSlides();
        dotsForeach();
    });

    prev.addEventListener("click", (e) => {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (index == 1) {
            index = slides.length;
        } else {
            index--;
        }

        checkCurSlides();
        dotsForeach();
    });

    dots.forEach(dot => {
        dot.addEventListener("click", (e) => {
            const slideTo = e.target.getAttribute("data-slide-to");
            index = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            checkCurSlides();
            dotsForeach();
        });
    });
}

module.exports = slider;