/* =========================================
   1. العناصر الرئيسية
========================================= */

const screens = document.querySelectorAll(".screen");

const openButton = document.getElementById("open-letter");
const endButton = document.getElementById("end-letter");

const starsContainer = document.getElementById("stars");
const shootingContainer = document.getElementById("shooting-stars");


/* =========================================
   2. الانتقال بين الشاشات
========================================= */

function showScreen(screenId) {

    const currentScreen = document.querySelector(".screen.active");
    const nextScreen = document.getElementById(screenId);

    if (!nextScreen || currentScreen === nextScreen) {
        return;
    }

    // إخفاء الشاشة الحالية

    if (currentScreen) {

        currentScreen.style.opacity = "0";
        currentScreen.style.transform = "translateY(-15px)";

        setTimeout(() => {

            currentScreen.classList.remove("active");

            currentScreen.style.display = "none";
            currentScreen.style.opacity = "";
            currentScreen.style.transform = "";

            // إظهار الشاشة الجديدة

            nextScreen.style.display = "flex";

            requestAnimationFrame(() => {
                nextScreen.classList.add("active");
            });

        }, 500);

    } else {

        nextScreen.style.display = "flex";
        nextScreen.classList.add("active");

    }

}


/* =========================================
   3. زر فتح الرسالة
========================================= */

openButton.addEventListener("click", () => {

    showScreen("chapter-1");

});


/* =========================================
   4. الانتقال بين الفصول
========================================= */

const nextButtons = document.querySelectorAll(".next-button");

nextButtons.forEach(button => {

    button.addEventListener("click", () => {

        const nextChapter = button.dataset.next;

        showScreen(nextChapter);

    });

});


/* =========================================
   5. نهاية الرسالة
========================================= */

endButton.addEventListener("click", () => {

    showScreen("ending");

});


/* =========================================
   6. إنشاء النجوم
========================================= */

function createStars() {

    const numberOfStars = 250;

    for (let i = 0; i < numberOfStars; i++) {

        const star = document.createElement("div");

        star.classList.add("star");

        // موقع عشوائي

        star.style.left = Math.random() * 100 + "%";

        star.style.top = Math.random() * 100 + "%";

        // حجم عشوائي

        const size = Math.random() * 2 + 1;

        star.style.width = size + "px";
        star.style.height = size + "px";

        // مدة الوميض

        star.style.animationDuration =
            (Math.random() * 4 + 2) + "s";

        // تأخير الوميض

        star.style.animationDelay =
            Math.random() * 5 + "s";

        starsContainer.appendChild(star);

    }

}

createStars();


/* =========================================
   7. النجوم المتساقطة
========================================= */

function createShootingStar() {

    const star = document.createElement("div");

    star.classList.add("shooting-star");

    star.style.left = Math.random() * 100 + 30 + "%";

    star.style.top = Math.random() * 50 + "%";

    shootingContainer.appendChild(star);

    setTimeout(() => {

        star.remove();

    }, 3000);

}

// ظهور نجمة متساقطة كل فترة

setInterval(() => {

    if (Math.random() > 0.3) {
        createShootingStar();
    }

}, 3500);


/* =========================================
   8. تأثير الكتابة التدريجية
========================================= */

function typeWriter(element, text, speed = 65) {

    let index = 0;

    element.textContent = "";

    const interval = setInterval(() => {

        element.textContent += text.charAt(index);

        index++;

        if (index >= text.length) {

            clearInterval(interval);

        }

    }, speed);

}


/* =========================================
   9. تأثير العناوين
========================================= */

function animateTitle(screen) {

    const title = screen.querySelector("h1, h2");

    if (!title) return;

    const originalText = title.textContent.trim();

    typeWriter(title, originalText, 85);

}


// تشغيل تأثير العنوان عند الانتقال

const observer = new MutationObserver(() => {

    const activeScreen = document.querySelector(".screen.active");

    if (activeScreen) {

        const title = activeScreen.querySelector("h1, h2");

        if (title && !title.dataset.animated) {

            title.dataset.animated = "true";

            animateTitle(activeScreen);

        }

    }

});

observer.observe(document.body, {

    attributes: true,

    subtree: true,

    attributeFilter: ["class"]

});


/* =========================================
   10. تأثير ظهور النصوص
========================================= */

const paragraphs = document.querySelectorAll(".chapter-content p");

paragraphs.forEach((paragraph, index) => {

    paragraph.style.opacity = "0";

    paragraph.style.transform = "translateY(15px)";

    paragraph.style.transition =
        "opacity 1s ease, transform 1s ease";

});

function revealParagraphs(screen) {

    const texts = screen.querySelectorAll(".chapter-content p");

    texts.forEach((paragraph, index) => {

        setTimeout(() => {

            paragraph.style.opacity = "1";

            paragraph.style.transform = "translateY(0)";

        }, 400 + index * 250);

    });

}


// مراقبة الفصول النشطة

const paragraphObserver = new MutationObserver(() => {

    const activeScreen = document.querySelector(".screen.active");

    if (activeScreen) {

        revealParagraphs(activeScreen);

    }

});

paragraphObserver.observe(document.body, {

    attributes: true,

    subtree: true,

    attributeFilter: ["class"]

});


/* =========================================
   11. حركة الإضاءة الخلفية
========================================= */

let glowPosition = 0;

function backgroundGlow() {

    glowPosition += 0.15;

    const light = Math.sin(glowPosition) * 0.05 + 0.15;

    document.body.style.setProperty(
        "--glow-intensity",
        light
    );

    requestAnimationFrame(backgroundGlow);

}

backgroundGlow();


/* =========================================
   12. تشغيل الموسيقى (اختياري)
========================================= */

const music = document.getElementById("background-music");

let musicStarted = false;

openButton.addEventListener("click", () => {

    if (!musicStarted && music) {

        music.volume = 0.25;

        music.play().then(() => {

            musicStarted = true;

        }).catch(() => {

            console.log("الموسيقى لم تبدأ.");

        });

    }

});


/* =========================================
   13. رسالة في وحدة التحكم
========================================= */

console.log(
    "%c رسالة بعد الغياب ",
    "color: #c6a477; background: #1b1511; font-size: 20px; padding: 10px;"
);

console.log("تم تحميل جميع التأثيرات بنجاح.");


/* =========================================
   انتهى تحميل المشروع
========================================= */