document.addEventListener('DOMContentLoaded', () => {
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

    const albumsData = [
        { name: 'White Noise (Sleep & Relaxation Sounds)', artist: 'Sleepy John', image: './assets/imgi_9_album-white-noise.jpg' },
        { name: '1 Por Amor, 2 Por Dinheiro', artist: 'Racionais', image: './assets/imgi_10_album-vida-loka.jpg' },
        { name: 'Nada Como Um Dia Após o Outro Dia', artist: 'Racionais', image: './assets/imgi_11_album-racionais.jpg' },
        { name: 'HIT ME HARD AND SOFT', artist: 'Billie Eilish', image: './assets/imgi_12_album-hit-me.jpg' },
        { name: 'Escândalo Íntimo', artist: 'Luísa Sonza', image: './assets/imgi_13_album-escandalo.jpg' },
        { name: 'O Céu Explica Tudo', artist: 'Henrique & Juliano', image: './assets/imgi_14_album-ceu-explica.jpg' },
        { name: 'Count your blessings', artist: 'Bring Me The Horizon', image: './assets/imgi_219_image-8.png' },
        { name: 'Popular', artist: 'The Weeknd', image: './assets/imgi_136_0x1900-000000-80-0-0.jpg' },
        { name: 'THRILLER', artist: 'Michael Jackson', image: './assets/imgi_25_default.jpg' }
    ];

    const artistsGrid = document.querySelector('.artists-grid');
    const albumsGrid = document.querySelector('.albums-grid');

    const headerItems = document.querySelectorAll(
        '.nav-item, .nav-library, .nav-playlist, .nav-podcast, .search-bar, .banner'
    );

    function createCard(data, type) {
        const el = document.createElement('div');
        el.classList.add(type === 'artist' ? 'artist-card' : 'album-card', 'fade-slide-up');

        el.innerHTML =
            type === 'artist'
                ? `<img src="${data.image}" alt="${data.name}"><p>${data.name}</p>`
                : `<img src="${data.image}" alt="${data.name}"><h3>${data.name}</h3><p>${data.artist}</p>`;

        return el;
    }

    artistsData.forEach((artist, i) => {
        const card = createCard(artist, 'artist');
        card.style.transitionDelay = `${i * 70}ms`;
        artistsGrid.appendChild(card);
    });

    albumsData.forEach((album, i) => {
        const card = createCard(album, 'album');
        card.style.transitionDelay = `${(artistsData.length + i) * 70}ms`;
        albumsGrid.appendChild(card);
    });

    headerItems.forEach((item, i) => {
        item.classList.add('fade-slide-up');
        item.style.transitionDelay = `${(artistsData.length + albumsData.length + i) * 50}ms`;
    });

    requestAnimationFrame(() => {
        document.querySelectorAll('.fade-slide-up').forEach(el => {
            el.classList.add('visible');
        });
    });
});