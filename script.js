document.addEventListener('DOMContentLoaded', function() {
    
  
    // HOME PAGE CAROUSEL LOGIC
   
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // run kalo on homepage
    if (prevBtn && nextBtn) {
        
        // data data game updates
        const carouselData = [
            {
                img: 'assets/update1.jpg',
                title: 'Town Hall 16 is Here!',
                desc: 'Check out the latest defenses and hero equipment.'
            },
            {
                img: 'assets/update2.jpg',
                title: 'New Troop: Root Rider',
                desc: 'Smash through walls and lead your army to victory. (Coming in 2027!)'
            },
            {
                img: 'assets/update3.jpg',
                title: 'Clan Games Revamped',
                desc: 'Earn more magic items and resources this season!'
            }
        ];

        let currentIndex = 0; 
        
        const imgElement = document.getElementById('carousel-img');
        const titleElement = document.getElementById('carousel-title');
        const descElement = document.getElementById('carousel-desc');

        function updateCarousel(index) {
            imgElement.src = carouselData[index].img;
            imgElement.alt = carouselData[index].title; /* added text change */
            titleElement.innerText = carouselData[index].title;
            descElement.innerText = carouselData[index].desc;
        }

        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex === 0) ? carouselData.length - 1 : currentIndex - 1;
            updateCarousel(currentIndex);
        });

        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex === carouselData.length - 1) ? 0 : currentIndex + 1;
            updateCarousel(currentIndex);
        });
    }

   
    // REGISTER PAGE FORM VALIDATION
    const form = document.getElementById('registrationForm');

    // run only kalo on registerpage
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            let isValid = true;

            // clear prev errors
            document.querySelectorAll('.error-message').forEach(span => span.innerText = '');

            // grab values
            const username = document.getElementById('username').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const gender = document.querySelector('input[name="gender"]:checked');
            const age = document.getElementById('age').value;
            const favTroop = document.getElementById('favTroop').value;
            const reason = document.getElementById('reason').value.trim();

            // PRESENCE VALIDATION (Name)
            if (username === '') {
                document.getElementById('nameError').innerText = 'Full Name is required.';
                isValid = false;
            }

            // STRING FORMAT VALIDATION. yg NO REGEX (Email)
            if (email === '') {
                document.getElementById('emailError').innerText = 'Email Address is required.';
                isValid = false;
            } else {
                let atSymbolIndex = email.indexOf('@');
                let dotIndex = email.lastIndexOf('.');
                if (atSymbolIndex < 1 || dotIndex < atSymbolIndex + 2 || dotIndex + 2 >= email.length) {
                    document.getElementById('emailError').innerText = 'Please enter a valid email (e.g., player@clash.com).';
                    isValid = false;
                }
            }


            // NEW PASSWORD VALIDATION
            if (password === '') {
                document.getElementById('passwordError').innerText = 'Password is required.';
                isValid = false;
            } else if (password.length < 8) {
                document.getElementById('passwordError').innerText = 'Password must be at least 8 characters long.';
                isValid = false;
            }

            // CONFIRM PASSWORD VALIDATION
            if (confirmPassword === '') {
                document.getElementById('confirmPasswordError').innerText = 'Please confirm your password.';
                isValid = false;
            } else if (password !== confirmPassword) {
                document.getElementById('confirmPasswordError').innerText = 'Passwords do not match.';
                isValid = false;
            }


            // ----------------------------------------------
            // ----------------------------------------------

            // RADIO VALIDATION (Gender)
            if (!gender) {
                document.getElementById('genderError').innerText = 'Please select your gender.';
                isValid = false;
            }

            // NUMERIC RANGE VALIDATION (Age)
            if (age === '' || isNaN(age) || age < 13) {
                document.getElementById('ageError').innerText = 'You must be at least 13 years old.';
                isValid = false;
            }

            // DROPDOWN VALIDATION(Troop)
            if (favTroop === '') {
                document.getElementById('troopError').innerText = 'Please select your favorite troop.';
                isValid = false;
            }

            // LENGTH VALIDUATION  (Reason)
            if (reason === '' || reason.length < 15) {
                document.getElementById('reasonError').innerText = 'Please provide a reason (min 15 characters).';
                isValid = false;
            }

            if (isValid) {
                // SIMPAN EMAIL DAN PASSWORD
                localStorage.setItem('savedName', username);
                localStorage.setItem('savedEmail', email);
                localStorage.setItem('savedPassword', password);
                
                alert('Registration Successful! Your credentials are saved. Welcome to Clash of BaNG!');
                form.reset();
            }
        });
    }


    // music
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');

    if (bgMusic && musicToggle) {
        
        const isMusicPlaying = localStorage.getItem('musicPlaying') === 'true';
        const savedTime = localStorage.getItem('musicTime') || 0;

        
        if (isMusicPlaying) {
            bgMusic.currentTime = savedTime;
            musicToggle.innerText = 'Stop Theme';
            musicToggle.classList.add('playing');
            
            
            let playPromise = bgMusic.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Browser blocked auto-resume. Waiting for user interaction.");
                });
            }
        }

    
        window.addEventListener('beforeunload', function() {
            localStorage.setItem('musicTime', bgMusic.currentTime);
        });

        
        musicToggle.addEventListener('click', function() {
            if (bgMusic.paused) {
                
                if (bgMusic.currentTime === 0) bgMusic.currentTime = 0; 
                bgMusic.play();
                musicToggle.innerText = 'Stop Theme';
                musicToggle.classList.add('playing');
                localStorage.setItem('musicPlaying', 'true'); 
            } else {
                bgMusic.pause();
                musicToggle.innerText = 'Play Theme';
                musicToggle.classList.remove('playing');
                localStorage.setItem('musicPlaying', 'false'); 
            }
        });
    }



    // ====== LOGIN 
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeBtn = document.querySelector('.close-btn');
    const submitLogin = document.getElementById('submitLogin');

    if (loginBtn && loginModal) {
        // 
        loginBtn.addEventListener('click', function() {
            if (localStorage.getItem('isLoggedIn') !== 'true') {
                loginModal.classList.add('show');
            }
        });

        
        closeBtn.addEventListener('click', function() {
            loginModal.classList.remove('show');
            document.getElementById('loginError').innerText = ''; 
        });

    
        window.addEventListener('click', function(event) {
            if (event.target === loginModal) {
                loginModal.classList.remove('show');
                document.getElementById('loginError').innerText = '';
            }
        });

        // verif
        submitLogin.addEventListener('click', function() {
            const inputEmail = document.getElementById('loginEmail').value.trim();
            const inputPassword = document.getElementById('loginPassword').value;
            const errorSpan = document.getElementById('loginError');

            // ambil data yang tersave
            const savedEmail = localStorage.getItem('savedEmail');
            const savedPassword = localStorage.getItem('savedPassword');
            
            errorSpan.className = 'error-message'; 

            if (inputEmail === '' || inputPassword === '') {
                errorSpan.innerText = 'Please enter both email and password.';
                errorSpan.classList.add('error-text');
            } else if (!savedEmail) {
                errorSpan.innerText = 'No account found. Please register first.';
                errorSpan.classList.add('warning-text');
           } else if (inputEmail === savedEmail && inputPassword === savedPassword) {
                errorSpan.innerText = 'Login Successful! Welcome back.';
                errorSpan.classList.add('success-text');
                
                localStorage.setItem('isLoggedIn', 'true'); 
                
                // close modalnya
                setTimeout(() => {
                    loginModal.classList.remove('show');
                    updateAuthUI(); 
                    errorSpan.innerText = '';
                }, 1500);
            } else { 
                errorSpan.innerText = 'Incorrect email or password.';
                errorSpan.classList.add('error-text');
            }
        });



    // HEADER AUTH UI
    // ==========================================
    function updateAuthUI() {
        const headerLoginBtn = document.getElementById('loginBtn');
        if (!headerLoginBtn) return;

        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const savedName = localStorage.getItem('savedName') || 'Clasher';

        if (isLoggedIn) {
        
            const firstName = savedName.split(' ')[0];
        
            headerLoginBtn.innerHTML = `Welcome, <span class="auth-username">${firstName}</span> <span class="auth-divider">|</span> <span id="logoutAction">Logout</span>`;
        
            document.getElementById('logoutAction').addEventListener('click', function(e) {
                e.stopPropagation(); 
                localStorage.setItem('isLoggedIn', 'false'); 
                updateAuthUI();
            });
        } else {
            
            headerLoginBtn.innerHTML = 'Login';
        }
    }

    // run s
    updateAuthUI();
    
    }
});