// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {
    // Dados dos artistas
    const artistsData = [
        { name: 'Zé Neto & Cristiano', image: './assets/imgi_3_artista-ze-neto.jpg' },
        { name: 'Matheus & Kauan', image: './assets/imgi_4_artista-mateus-kauan.jpg' },
        { name: 'Luan Santana', image: './assets/imgi_5_artista-luan-santana.jpg' },
        { name: 'Jorge & Mateus', image: './assets/imgi_6_artista-jorge-mateus.jpg' },
        { name: 'Henrique & Juliano', image: './assets/imgi_7_artista-henrique-juliano.jpg' },
        { name: 'Gusttavo Lima', image: './assets/imgi_8_artista-gustavo-limma.jpg' },
        { name: 'Ariana Grande', image: './assets/imgi_9_ab67616d00001e02b622d42c30697e1e1414343c.jpg' },
        { name: 'Matuê', image: './assets/imgi_34_ab67616d00001e02996475bce560ead5737dbda1.jpg' },
        { name: 'Lady Gaga', image: './assets/imgi_33_ab67616d00001e02b0860cf0a98e09663c82290c.jpg' },
        { name: 'Michael Jackson', image: './assets/imgi_64_ab6775700000ee856a3ba0d47990204a73f846f4.jpg' }
    ];

    // Dados dos álbuns
    const albumsData = [
        { name: 'White Noise (Sleep & Relaxation Sounds)', artist: 'Sleepy John', image: './assets/imgi_9_album-white-noise.jpg' },
        { name: '1 Por Amor, 2 Por Dinheiro', artist: 'Racionais', image: './assets/imgi_10_album-vida-loka.jpg' },
        { name: 'Nada Como Um Dia Após o Outro Dia', artist: 'Racionais', image: './assets/imgi_11_album-racionais.jpg' },
        { name: 'HIT ME HARD AND SOFT', artist: 'Billie Eilish', image: './assets/imgi_12_album-hit-me.jpg' },
        { name: 'Escândalo Íntimo', artist: 'Luísa Sonza', image: './assets/imgi_13_album-escandalo.jpg' },
        { name: 'O Céu Explica Tudo', artist: 'Henrique & Juliano', image: './assets/imgi_14_album-ceu-explica.jpg' },
        { name: 'Count your blessings', artist: 'Bring Me The Horizon', image: './assets/imgi_219_image-8.png' },
        { name: 'Popular', artist: 'The Weeknd', image: './assets/imgi_136_0x1900-000000-80-0-0.jpg' },
        { name: 'THRILLER', artist: 'Michael Jackson', image: './assets/imgi_25_default.jpg' },
    ];

    const artGrid = document.querySelector('.artists-grid');
    const albumsGrid = document.querySelector('.albums-grid');

    artistsData.forEach((artist, index) => {
        const artistCard = document.createElement('div');
        artistCard.classList.add('artist-card', 'fade-slide-up');
        artistCard.style.transitionDelay = `${index * 70}ms`;

        artistCard.innerHTML = `
            <img src="${artist.image}" alt="${artist.name}">
            <p>${artist.name}</p>
        `;

        artGrid.appendChild(artistCard);
    });


    albumsData.forEach((album, index) => {
        const albumCard = document.createElement('div');
        albumCard.classList.add('album-card', 'fade-slide-up');
        albumCard.style.transitionDelay = `${(artistsData.length + index) * 70}ms`;

        albumCard.innerHTML = `
            <img src="${album.image}" alt="${album.name}">
            <h3>${album.name}</h3>
            <p>${album.artist}</p>
        `;

        albumsGrid.appendChild(albumCard);
    });


    const visibleHeaderItems = document.querySelectorAll('.nav-item, .nav-library, .nav-playlist, .nav-podcast, .search-bar, .banner');
    visibleHeaderItems.forEach((item, index) => {
        item.classList.add('fade-slide-up');
        item.style.transitionDelay = `${(artistsData.length + albumsData.length + index) * 50}ms`;
    });


    requestAnimationFrame(() => {
        document.querySelectorAll('.fade-slide-up').forEach(item => item.classList.add('visible'));
    });


    const sidebar = document.querySelector('nav');
    const isDesktopScroll = window.matchMedia('(hover: hover)').matches && window.innerWidth > 980;

    if (isDesktopScroll) {
        let sidebarCurrent = sidebar.scrollTop;
        let sidebarTarget = sidebarCurrent;
        let sidebarAnimating = false;


        const smoothSidebarScroll = () => {
            sidebarCurrent += (sidebarTarget - sidebarCurrent) * 0.16;

            if (Math.abs(sidebarTarget - sidebarCurrent) < 0.5) {
                sidebar.scrollTop = sidebarTarget;
                sidebarAnimating = false;
                return;
            }

            sidebar.scrollTop = sidebarCurrent;
            requestAnimationFrame(smoothSidebarScroll);
        };


        sidebar.addEventListener('wheel', event => {
            if (event.ctrlKey || event.metaKey || event.altKey) {
                return;
            }

            const atTop = sidebar.scrollTop === 0;
            const atBottom = sidebar.scrollTop + sidebar.clientHeight >= sidebar.scrollHeight - 1;

            if ((event.deltaY < 0 && atTop) || (event.deltaY > 0 && atBottom)) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();

            sidebarTarget = Math.max(
                0,
                Math.min(sidebar.scrollHeight - sidebar.clientHeight, sidebarTarget + event.deltaY)
            );

            if (!sidebarAnimating) {
                sidebarAnimating = true;
                requestAnimationFrame(smoothSidebarScroll);
            }
        }, { passive: false });

        let currentScroll = window.scrollY;
        let targetScroll = currentScroll;
        let isAnimating = false;


        const smoothScroll = () => {
            currentScroll += (targetScroll - currentScroll) * 0.16;

            if (Math.abs(targetScroll - currentScroll) < 0.5) {
                window.scrollTo(0, targetScroll);
                isAnimating = false;
                return;
            }

            window.scrollTo(0, currentScroll);
            requestAnimationFrame(smoothScroll);
        };

        // Event listener para scroll suave da página
        window.addEventListener('wheel', event => {
            if (event.ctrlKey || event.metaKey || event.altKey) {
                return;
            }

            if (event.target.closest('nav')) {
                return;
            }

            event.preventDefault();
            targetScroll = Math.max(
                0,
                Math.min(document.documentElement.scrollHeight - window.innerHeight, targetScroll + event.deltaY)
            );

            if (!isAnimating) {
                isAnimating = true;
                requestAnimationFrame(smoothScroll);
            }
        }, { passive: false });
    }
});