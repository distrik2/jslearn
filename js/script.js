"use strict";

document.addEventListener("DOMContentLoaded", () => {

    const tabsparent = document.querySelector(".tabheader__items");
    const tabs = document.querySelectorAll(".tabheader__item");
    const tabscontent = document.querySelectorAll(".tabcontent");

    function hideTabContent() {
        tabscontent.forEach(item => {
            item.classList.add("hide");
            item.classList.remove("show", "fade");

        });

        tabs.forEach(item => {
            item.classList.remove("tabheader__item_active");
        });
    }

    function showTabContent(i = 0) {
        tabscontent[i].classList.add("show", "fade");
        tabscontent[i].classList.remove("hide");
        tabs[i].classList.add("tabheader__item_active");
    }

    hideTabContent();
    showTabContent();

    tabsparent.addEventListener("click", (e) => {
        const target = e.target;

        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });


    // timer

    const deadline = new Date(2021, 5, 16, 0);
    // const deadline = "2022-01-01";

    function getTimeRem(endtime) {
        const t = endtime - Date.parse(new Date());
        const days = Math.floor(t / (1000 * 60 * 60 * 24));
        const hours = Math.floor((t / (1000 * 60 * 60) % 24));
        const minutes = Math.floor((t / 1000 / 60) % 60);
        const seconds = Math.floor((t / 1000) % 60);

        return {
            t,
            days,
            hours,
            minutes,
            seconds,
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        }
        else {
            return num;
        }
    }

    function setClock(endtime) {
        const timer = document.querySelector(".timer");
        const days = timer.querySelector("#days");
        const hours = timer.querySelector("#hours");
        const minutes = timer.querySelector("#minutes");
        const seconds = timer.querySelector("#seconds");
        const timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRem(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.t <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(deadline);


    //modal window

    const modalList = document.querySelectorAll("[data-modal]");
    const modal = document.querySelector(".modal");

    function closeModal() {
        modal.style.display = "none";
        document.body.style.overflow = "";
    }

    function openModal() {
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
        clearInterval(modalTimerId);
    }

    modalList.forEach(item => {
        item.addEventListener("click", () => {
            openModal();
        });
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal || e.target.getAttribute("data-close") == "") {
            closeModal();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape" && modal.style.display === "block") {
            closeModal();
        }
    });

    // const modalTimerId = setTimeout(openModal, 50000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener("scroll", showModalByScroll);
        }
    }

    // window.addEventListener("scroll", showModalByScroll);


    //menu. Get

    async function getResource(url) {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`FUCK! Status:${res.status}`);
        }

        return await res.json();
    }
    getResource("http://localhost:3000/menu")
        .then(data => {
            data.forEach(({ img, altimg, title, descr, price }) => {
                new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
            });
        });

    // axios.get("http://localhost:3000/menu")
    //     .then(data => {
    //         data.data.forEach(({ img, altimg, title, descr, price }) => {
    //             new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
    //         });
    //     });

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = "menu__item";
                element.classList.add(this.element);
            }
            else {
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    // Forms + fetch
    const forms = document.querySelectorAll('form');
    const message = {
        loading: "img/spinner.svg",
        success: "Скоро мы с вами свяжемся",
        failure: "Что-то пошло не так",

    };

    forms.forEach(item => {
        bindpostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: data
        });

        return await res.json();
    };

    function bindpostData(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData("http://localhost:3000/requests", json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(message.failure);
                })
                .finally(() => {
                    form.reset();
                });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }



    //slider


    const slides = document.querySelectorAll(".offer__slide");
    const next = document.querySelector(".offer__slider-next");
    const prev = document.querySelector(".offer__slider-prev");
    const currentSlide = document.querySelector("#current");
    const totalSlide = document.querySelector("#total");
    let index = 1;

    function hideSlide() {
        slides.forEach(item => {
            item.classList.add("hide");
            item.classList.remove("show", "fade");
        });
    }
    function showSlide(i = 0) {
        slides[i].classList.add("show", "fade");
        slides[i].classList.remove("hide");
    }

    function currCount() {
        if (slides.length < 10) {
            currentSlide.textContent = `0${index}`;
        } else {
            currentSlide.textContent = index;
        }
    }

    hideSlide();
    showSlide();

    if (slides.length < 10) {
        totalSlide.textContent = `0${slides.length}`;
    } else {
        totalSlide.textContent = slides.length;
    }

    function renderSlide(n) {
        if (n > slides.length) {
            index = 1;
        }
        if (n < 1) {
            index = slides.length;
        }

        hideSlide();
        showSlide(index - 1);
        currCount();
    }

    function plusSlides(n) {
        renderSlide(index += n);
    }

    next.addEventListener("click", (e) => {
        plusSlides(+1);
    });

    prev.addEventListener("click", (e) => {
        plusSlides(-1);
    });

    // function test() {
    //     if (slides.length < 10) {
    //         currentSlide.textContent = `0${currentSlide.textContent}`;
    //     } else {
    //         currentSlide.textContent = currentSlide.textContent;
    //     }
    // }

    // next.addEventListener("click", (e) => {
    //     if (currentSlide.textContent < 4) {
    //         currentSlide.textContent++;
    //         hideSlide();
    //         showSlide(currentSlide.textContent);
    //         test();
    //     }
    //     else if (currentSlide.textContent == 4) {
    //         currentSlide.textContent = 1;
    //         hideSlide();
    //         showSlide(currentSlide.textContent);
    //         test();
    //     }
    // });

    // prev.addEventListener("click", (e) => {
    //     if (currentSlide.textContent > 1) {
    //         currentSlide.textContent--;
    //         hideSlide();
    //         showSlide(currentSlide.textContent);
    //         test();
    //     }
    //     else if (currentSlide.textContent == 1) {
    //         currentSlide.textContent = 4;
    //         hideSlide();
    //         showSlide(currentSlide.textContent);
    //         test();
    //     }
    // });
});