document.addEventListener('DOMContentLoaded', function() {
    
    const sidebarButton = document.getElementById('sidebar-button');
    const closeSidebarBtn = document.getElementById('close-sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const sidebar = document.getElementById('sidebar');

    if (sidebarButton) {
        sidebarButton.addEventListener('click', function() {
            sidebar.classList.remove('-translate-x-full');
            sidebarOverlay.classList.remove('opacity-0', 'pointer-events-none');
            sidebarOverlay.classList.add('opacity-50');
        });
    }

    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', closeSidebar);
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }

    function closeSidebar() {
        sidebar.classList.add('-translate-x-full');
        sidebarOverlay.classList.add('opacity-0', 'pointer-events-none');
        sidebarOverlay.classList.remove('opacity-50');
    }

    
    const themeToggle = document.getElementById('theme-toggle');
    const themeMenu = document.getElementById('theme-menu');
    const themeOptions = document.querySelectorAll('.theme-option');

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            themeMenu.classList.toggle('hidden');
        });
    }

    if (themeOptions.length > 0) {
        themeOptions.forEach(option => {
            option.addEventListener('click', function() {
                const theme = this.dataset.themeValue;
                setTheme(theme);
                themeMenu.classList.add('hidden');
                updateActiveTheme(theme);
            });
        });
    }

    function setTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
        } else if (theme === 'light') {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
        } else {
            localStorage.removeItem('theme');
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    }

    function updateActiveTheme(theme) {
        themeOptions.forEach(option => {
            const activeIcon = option.querySelector('.active-icon');
            if (activeIcon) {
                if (option.dataset.themeValue === theme) {
                    activeIcon.classList.remove('hidden');
                } else {
                    activeIcon.classList.add('hidden');
                }
            }
        });
    }

    
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        updateActiveTheme('dark');
    } else {
        document.documentElement.classList.remove('dark');
        updateActiveTheme('light');
    }

    
    const userMenuButton = document.getElementById('user-menu-button');
    const userMenu = document.getElementById('user-menu');

    if (userMenuButton && userMenu) {
        userMenuButton.addEventListener('click', function() {
            userMenu.classList.toggle('hidden');
        });
    }

    
    document.addEventListener('click', function(event) {
        if (themeMenu && !event.target.closest('.theme-switcher')) {
            themeMenu.classList.add('hidden');
        }
        if (userMenu && !event.target.closest('.relative') && !event.target.closest('#user-menu-button')) {
            userMenu.classList.add('hidden');
        }
    });
});