/* ======================= Toggle movement javascirpt   ======================== */

const button = document.querySelector(".burger");
let {
    width,
    height,
    x: buttonX,
    y: buttonY
} = button.getBoundingClientRect(); // gives you width, height, left-X,top-y of the button

buttonX = buttonX + width / 2; //  center point of button on x-axis
buttonY = buttonY + height / 2; //  center point of button on y-axis

/*************** Functions ***************/

let distance = width;
let mouseHasEntered = true;
let mouseIsInButtonTerritory;

function mouseMove(e) {
    const x = e.x; // current x of cursor
    const y = e.y; // current y of cursor

    const leftBorderLine = buttonX - distance;
    const rightBorderLine = buttonX + distance;
    const topBorderLine = buttonY - distance;
    const bottomBorderline = buttonY + distance;
    const xWalk = (x - buttonX) / 2; // the distance to move the button when mouse moves on X axis
    const yWalk = (y - buttonY) / 2; // the distance to move the button when mouse moves on Y axis

    mouseIsInButtonTerritory =
        x > leftBorderLine &&
        x < rightBorderLine &&
        y > topBorderLine &&
        y < bottomBorderline; // becomes true if  mouse is inside all of these border-line

    if (mouseIsInButtonTerritory) {
        if (mouseHasEntered) {
            distance = distance + distance;
            mouseHasEntered = false;
        }
        catchCursor(xWalk, yWalk); // call the function when mouse in in the button's territory
    } else {
        resetPositon();
    }
}

function catchCursor(xWalk, yWalk) {
    button.style.transform = `translate(${xWalk}px, ${yWalk}px)`;
}

function resetPositon() {
    // resets the postion of the button as it was initial.
    button.style.transform = `translate(${0}px, ${0}px)`;
    if (!mouseHasEntered) distance /= 2;
    mouseHasEntered = true;
    // when button is return to it's position (mouseHasEntered = true) lets to increase the initial borderline of button for the next time
}

window.addEventListener("mousemove", mouseMove);




















(function($) {
    $(document).ready(function() {
        "use strict";

        // BACK BUTTON RELOAD
        window.onpageshow = function(event) {
            if (event.persisted) {
                window.location.reload()
            }
        };


        // PRELOADER
        var counting = setInterval(function() {
            var loader = document.getElementById("percentage");
            var currval = parseInt(loader.innerHTML);
            var Width = 99 - currval;
            var loadscreen = document.getElementById("loader-progress");
            loader.innerHTML = ++currval;
            if (currval === 100) {
                clearInterval(counting);
                $("body").toggleClass('page-loaded');
            }
            loadscreen.style.transition = "0.1s";
            loadscreen.style.width = Width + "%";
        }, 10);


        // HAMBURGER AUDIO
        document.getElementById("hamburger-menu").addEventListener('click', function(e) {
            document.getElementById("hamburger-hover").play();
        });

        // LOGO RANDOM FADE
        // $(function () {
        //   // time between image rotate
        //   var delay = 3000;

        //   $('.logos ul > li figure').each(function () {
        //     // save images in an array
        //     var $imgArr = $(this).children();
        //     // show a random image
        //     $imgArr.eq(Math.floor(Math.random() * $imgArr.length)).show();
        //   });
        //   // run the changeImage function after every (delay) miliseconds
        //   setInterval(function () {
        //     changeImage();
        //   }, delay);

        //   function changeImage() {
        //     // save list items in an array
        //     var $liArr = $('.logos ul > li figure');
        //     // select a random list item
        //     var $currLi = $liArr.eq(Math.floor(Math.random() * $liArr.length));
        //     // get the currently visible image
        //     var $currImg = $('img:visible', $currLi);
        //     if ($currImg.next().length == 1) {
        //       var $next = $currImg.next();
        //     } else {
        //       var $next = $('img:first', $currLi);
        //     }
        //     $currImg.fadeOut(1500);
        //     $next.fadeIn(1500);
        //   }
        // });


        // CONTACT FORM INPUT LABEL
        function checkForInput(element) {
            const $label = $(element).siblings('span');
            if ($(element).val().length > 0) {
                $label.addClass('label-up');
            } else {
                $label.removeClass('label-up');
            }
        }

        // The lines below are executed on page load
        $('input, textarea').each(function() {
            checkForInput(this);
        });

        // The lines below (inside) are executed on change & keyup
        $('input, textarea').on('change keyup', function() {
            checkForInput(this);
        });


        // SWIPER SLIDER
        var mySwiper = new Swiper('.swiper-container', {
            slidesPerView: 'auto',
            spaceBetween: 0,
            loop: true,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                renderBullet: function(index, className) {
                    return '<span class="' + className + '"><svg><circle r="18" cx="20" cy="20"></circle></svg></span>';
                },
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        })


        // PAGE TRANSITION
        $('body a').on('click', function(e) {
            if (typeof $(this).data('fancybox') == 'undefined' || $(this).attr('target') == '_blank') {
                e.preventDefault();
                var url = this.getAttribute("href");
                if (url.indexOf('#') != -1) {
                    var hash = url.substring(url.indexOf('#'));

                    if ($('body ' + hash).length != 0) {
                        $('.transition-overlay').removeClass("active");
                        $(".hamburger").toggleClass("open");
                        $("body").toggleClass("overflow");
                        $(".navigation-menu").removeClass("active");
                        $(".navigation-menu .inner ul").css("transition-delay", "0s");
                        $(".navigation-menu .inner blockquote").css("transition-delay", "0s");
                        $(".navigation-menu .bg-layers span").css("transition-delay", "0.3s");

                        $('html, body').animate({
                            scrollTop: $(hash).offset().top
                        }, 1000);

                    }
                } else {
                    $('.transition-overlay').toggleClass("active");
                    setTimeout(function() {
                        window.location = url;
                    }, 600);

                }
            }
        });


        // GO TO TOP
        $(window).scroll(function() {
            if ($(this).scrollTop() > 300) {
                $('.gotop').fadeIn();
            } else {
                $('.gotop').fadeOut();
            }
        });

        $('.gotop').on('click', function(e) {
            $("html, body").animate({
                scrollTop: 0
            }, 600);
            return false;
        });


        // STICKY SIDE LOGO
        $(window).on("scroll touchmove", function() {
            $('.logo').toggleClass('sticky', $(document).scrollTop() > 300);
        });


        // STICKY NAVBAR
        $(window).on("scroll touchmove", function() {
            $('.header').toggleClass('sticky', $(document).scrollTop() > 30);
        });


        // DATA BACKGROUND IMAGE
        var pageSection = $(".swiper-slide");
        pageSection.each(function(indx) {
            if ($(this).attr("data-background")) {
                $(this).css("background-image", "url(" + $(this).data("background") + ")");
            }
        });


        // HAMBURGER
        $(function() {
            var $burger = $('.burger');
            var $bars = $('.burger-svg__bars');
            var $bar = $('.burger-svg__bar');
            var $bar1 = $('.burger-svg__bar-1');
            var $bar2 = $('.burger-svg__bar-2');
            var $bar3 = $('.burger-svg__bar-3');
            var isChangingState = false;
            var isOpen = false;
            var burgerTL = new TimelineMax();

            function burgerOver() {

                if (!isChangingState) {
                    burgerTL.clear();
                    if (!isOpen) {
                        burgerTL.to($bar1, 0.5, {
                                y: -2,
                                ease: Elastic.easeOut
                            })
                            .to($bar2, 0.5, {
                                scaleX: 0.6,
                                ease: Elastic.easeOut,
                                transformOrigin: "50% 50%"
                            }, "-=0.5")
                            .to($bar3, 0.5, {
                                y: 2,
                                ease: Elastic.easeOut
                            }, "-=0.5");
                    } else {
                        burgerTL.to($bar1, 0.5, {
                                scaleX: 1.2,
                                ease: Elastic.easeOut
                            })
                            .to($bar3, 0.5, {
                                scaleX: 1.2,
                                ease: Elastic.easeOut
                            }, "-=0.5");
                    }
                }
            }

            function burgerOut() {
                if (!isChangingState) {
                    burgerTL.clear();
                    if (!isOpen) {
                        burgerTL.to($bar1, 0.5, {
                                y: 0,
                                ease: Elastic.easeOut
                            })
                            .to($bar2, 0.5, {
                                scaleX: 1,
                                ease: Elastic.easeOut,
                                transformOrigin: "50% 50%"
                            }, "-=0.5")
                            .to($bar3, 0.5, {
                                y: 0,
                                ease: Elastic.easeOut
                            }, "-=0.5");
                    } else {
                        burgerTL.to($bar1, 0.5, {
                                scaleX: 1,
                                ease: Elastic.easeOut
                            })
                            .to($bar3, 0.5, {
                                scaleX: 1,
                                ease: Elastic.easeOut
                            }, "-=0.5");
                    }
                }
            }

            function showCloseBurger() {
                burgerTL.clear();
                burgerTL.to($bar1, 0.3, {
                        y: 6,
                        ease: Power4.easeIn
                    })
                    .to($bar2, 0.3, {
                        scaleX: 1,
                        ease: Power4.easeIn
                    }, "-=0.3")
                    .to($bar3, 0.3, {
                        y: -6,
                        ease: Power4.easeIn
                    }, "-=0.3")
                    .to($bar1, 0.5, {
                        rotation: 45,
                        ease: Elastic.easeOut,
                        transformOrigin: "50% 50%"
                    })
                    .set($bar2, {
                        opacity: 0,
                        immediateRender: false
                    }, "-=0.5")
                    .to($bar3, 0.5, {
                        rotation: -45,
                        ease: Elastic.easeOut,
                        transformOrigin: "50% 50%",
                        onComplete: function() {
                            isChangingState = false;
                            isOpen = true;
                        }
                    }, "-=0.5");
            }

            function showOpenBurger() {
                burgerTL.clear();
                burgerTL.to($bar1, 0.3, {
                        scaleX: 0,
                        ease: Back.easeIn
                    })
                    .to($bar3, 0.3, {
                        scaleX: 0,
                        ease: Back.easeIn
                    }, "-=0.3")
                    .set($bar1, {
                        rotation: 0,
                        y: 0
                    })
                    .set($bar2, {
                        scaleX: 0,
                        opacity: 1
                    })
                    .set($bar3, {
                        rotation: 0,
                        y: 0
                    })
                    .to($bar2, 0.5, {
                        scaleX: 1,
                        ease: Elastic.easeOut
                    })
                    .to($bar1, 0.5, {
                        scaleX: 1,
                        ease: Elastic.easeOut
                    }, "-=0.4")
                    .to($bar3, 0.5, {
                        scaleX: 1,
                        ease: Elastic.easeOut,
                        onComplete: function() {
                            isChangingState = false;
                            isOpen = false;
                        }
                    }, "-=0.5");
            }

            $burger.on('click', function(e) {
                $("body").toggleClass("overflow");
                $(".navigation-menu").toggleClass("active");
                $(".navbar").toggleClass("light");
                if (!isChangingState) {
                    isChangingState = true;

                    if (!isOpen) {
                        showCloseBurger();
                    } else {
                        showOpenBurger();
                    }
                }

            });

            $burger.hover(burgerOver, burgerOut);

        });


        // MASONRY
        var $container = $('.works ul').imagesLoaded(function() {
            $container.isotope({
                itemSelector: '.works ul li',
                layoutMode: 'masonry'
            });
        });


    });


    // SCROLL BG COLOR
    $(window).scroll(function() {
        var $window = $(window),
            $body = $('body'),
            $panel = $('section, footer, header');

        var scroll = $window.scrollTop() + ($window.height() / 3);

        $panel.each(function() {
            var $this = $(this);
            if ($this.position().top <= scroll && $this.position().top + $this.height() > scroll) {

                $body.removeClass(function(index, css) {
                    return (css.match(/(^|\s)color-\S+/g) || []).join(' ');
                });

                $body.addClass('color-' + $(this).data('color'));
            }
        });

    }).scroll();


    // WOW ANIMATION 
    wow = new WOW({
        animateClass: 'animated',
        offset: 5
    });
    wow.init();


    // COUNTER
    $(document).scroll(function() {
        $('.odometer').each(function() {
            var parent_section_postion = $(this).closest('section').position();
            var parent_section_top = parent_section_postion.top;
            if ($(document).scrollTop() > parent_section_top - 300) {
                if ($(this).data('status') == 'yes') {
                    $(this).html($(this).data('count'));
                    $(this).data('status', 'no')
                }
            }
        });
    });

    // slider video text 

    $('.project-slider').on('changed.owl.carousel initialized.owl.carousel', function(event) {
        $(event.target)
            .find('.owl-item').removeClass('last')
            .eq(event.item.index + event.page.size - 1).addClass('last');

        $(event.target)
            .find('.owl-item').removeClass('four')
            .eq(event.item.index + event.page.size - 2).addClass('four');

        $(event.target)
            .find('.owl-item').removeClass('three')
            .eq(event.item.index + event.page.size - 3).addClass('three');

        $(event.target)
            .find('.owl-item').removeClass('second')
            .eq(event.item.index + event.page.size - 4).addClass('second');

        $(event.target)
            .find('.owl-item').removeClass('first')
            .eq(event.item.index).addClass('first');


    }).owlCarousel({
        loop: true,
        dots: false,
        nav: false,
        mouseDrag: true,
        autoplay: true,
        animateOut: 'slideOutUp',
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        }
    });

    //  Customer Testimonial
    var owl = $(".testimonial-slider");
    owl.owlCarousel({
        items: 1,
        margin: 10,
        loop: true,
        nav: true,
        dots: false,
    });
})(jQuery);



$(document).ready(function() {
    var owl = $(".text-slide");
    owl.owlCarousel({
        items: 1,
        loop: true,
        dots: false,
        autoplay: true,
        autoPlaySpeed: 10,
        autoPlayTimeout: 10,
        animateOut: 'slideOutUp',
    });
});



/* ============== Javasciprt for spider particals ============ */
/* ---- particles.js config ---- */

function particalAnimation() {
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 380,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#bbb"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#bbb",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

}


function img3deffect(cardHovered) {
    let el = document.getElementById(cardHovered);

    console.log(el);

    const height = el.clientHeight
    const width = el.clientWidth
    el.addEventListener('mousemove', handleMove)

    function handleMove(e) {
        const xVal = e.layerX
        const yVal = e.layerY

        const yRotation = 20 * ((xVal - width / 2) / width)

        const xRotation = -20 * ((yVal - height / 2) / height)

        const string = 'perspective(500px) scale(1.1) rotateX(' + xRotation + 'deg) rotateY(' + yRotation + 'deg)'

        el.style.transform = string
    }

    el.addEventListener('mouseout', function() {
        el.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)'
    })

    el.addEventListener('mousedown', function() {
        el.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)'
    })

    el.addEventListener('mouseup', function() {
        el.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)'
    })

}



// Quiz - for how to work page 

const questions = [{
        question: "How many days makes a week ?",
        optionA: "10 days",
        optionB: "14 days",
        optionC: "5 days",
        optionD: "7 days",
        correctOption: "optionD"
    },

    {
        question: "30 days has ______ ?",
        optionA: "January",
        optionB: "December",
        optionC: "June",
        optionD: "August",
        correctOption: "optionC"
    },

    {
        question: "How many hours can be found in a day ?",
        optionA: "30 hours",
        optionB: "38 hours",
        optionC: "48 hours",
        optionD: "24 hours",
        correctOption: "optionD"
    },


    {
        question: "Which of these numbers is an odd number ?",
        optionA: "Ten",
        optionB: "Twelve",
        optionC: "Eight",
        optionD: "Eleven",
        correctOption: "optionD"
    },


    {
        question: "How many permanent teeth does a dog have ?",
        optionA: "38",
        optionB: "42",
        optionC: "40",
        optionD: "36",
        correctOption: "optionB"
    },

    {
        question: "How many sides does an hexagon have ?",
        optionA: "Six",
        optionB: "Sevene",
        optionC: "Four",
        optionD: "Five",
        correctOption: "optionA"
    },

    {
        question: "How many hearts does an Octopus have ?",
        optionA: "One",
        optionB: "Two",
        optionC: "Three",
        optionD: "Four",
        correctOption: "optionC"
    }

]


let shuffledQuestions = [] //empty array to hold shuffled selected questions

function handleQuestions() {
    //function to shuffle and push 10 questions to shuffledQuestions array
    while (shuffledQuestions.length <= 6) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1
let playerScore = 0
let wrongAttempt = 0
let indexNumber = 0

// function for displaying next question in the array to dom
function NextQuestion(index) {

    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //gets current Question 
    const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
            correctOption = option.labels[0].id
        }
    })

    //checking to make sure a radio input has been checked or an option being chosen
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        } else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}



//called when the next button is called
function handleNextQuestion() {
    checkForAnswer()
    unCheckRadioButtons()
    //delays next question displaying for a second
    setTimeout(() => {
        if (indexNumber <= 6) {
            NextQuestion(indexNumber)
        } else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function for when all questions being answered
function handleEndGame() {
    let remark = null
    let remarkColor = null

    // condition check for player remark and remark color
    if (playerScore <= 3) {
        remark = "Bad Grades, Keep Practicing."
        remarkColor = "red"
    } else if (playerScore >= 4 && playerScore < 7) {
        remark = "Average Grades, You can do better."
        remarkColor = "orange"
    } else if (playerScore >= 7) {
        remark = "Excellent, Keep the good work going."
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 7) * 100

    //data to display to score board
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

//closes score modal and resets game
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

//function to close warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}