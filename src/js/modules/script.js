import { bodyLockToggle } from "./functions.js";

document.addEventListener('DOMContentLoaded', function() {
    const videoModule = document.querySelector('.video');
    if(videoModule) {
        const videoWatcher = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const targetElement = entry.target;
                
                if (targetElement.dataset.watch === 'video' && !targetElement.classList.contains('_init')) {
                    if (entry.isIntersecting) {
                        // Видим объект
                        targetElement.querySelector('video').play();
                    } else {
                        // Не видим объект
                        targetElement.querySelector('video').pause();
                    }
                }
            })
        })
        videoWatcher.observe(document.querySelector('.video'))
        
            videoModule.addEventListener("click", function (e) {
                if (!videoModule.classList.contains('init')) {
                    videoModule.querySelector('video').src = videoModule.querySelector('video').dataset.full;
                    videoModule.classList.add('active');
                    videoModule.classList.add('init');
                    videoModule.querySelector('video').play();
                    videoModule.querySelector('video').muted = false;
                } else {
                    if (videoModule.querySelector('video').paused) {
                        videoModule.querySelector('video').play();
                    } else {
                        videoModule.querySelector('video').pause();
                    }
                    videoModule.classList.toggle('active');
                }
            });
    }  
    const sidebarBtn = document.querySelector('.sidebar__button');
    if(sidebarBtn) {
        const sidebar = document.querySelector('.sidebar');
        sidebarBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            bodyLockToggle()
        })
    }
    
})

