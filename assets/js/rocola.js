const songs = {
    "canciones": [
        {
            "titulo": "Vampire",
            "artista": "Olivia Rodrigo",
            "url": "https://www.youtube.com/embed/RlPNh_PBZb4?si=i07MByw3KibkO2G1",
            "id": 1
        },
        {
            "titulo": "Quédate",
            "artista": "Quevedo & Bizarrap",
            "url": "https://www.youtube.com/embed/_PdogVJx9Iw?si=IA9oPSvjiwNQmEJY",
            "id": 2
        },
        {
            "titulo": "Flowers",
            "artista": "Miley Cyrus",
            "url": "https://www.youtube.com/embed/G7KNmW9a75Y?si=fuupRp6Y1S8-Ahkc",
            "id": 3
        },
        {
            "titulo": "Ella Baila Sola",
            "artista": "Eslabon Armado & Peso Pluma",
            "url": "https://www.youtube.com/embed/lZiaYpD9ZrI?si=LJ4-rbq1eeMmnqjL",
            "id": 4
        },
        {
            "titulo": "Seven",
            "artista": "Jung Kook (feat. Latto)",
            "url": "https://www.youtube.com/embed/QU9c0053UAU?si=feTW_3RUDmUe5Gh3",
            "id": 5
        },
        {
            "titulo": "Monaco",
            "artista": "Bad Bunny",
            "url": "https://www.youtube.com/embed/_PJvpq8uOZM?si=hPxqB5j786YwZ9AI",
            "id": 6
        },
        {
            "titulo": "Padam Padam",
            "artista": "Kylie Minogue",
            "url": "https://www.youtube.com/embed/p6Cnazi_Fi0?si=7zQMx_ngJPCTUpix",
            "id": 7
        },
        {
            "titulo": "Callaíta",
            "artista": "Bad Bunny & Tainy",
            "url": "https://www.youtube.com/embed/acEOASYioGY?si=5DryOf8R3A4MX1Kv",
            "id": 8
        },
        {
            "titulo": "La Bebé (Remix)",
            "artista": "Yng Lvcas & Peso Pluma",
            "url": "https://www.youtube.com/embed/3mchJ-EW9rM?si=vc-DoPOR1An6Gz0v",
            "id": 9
        },
        {
            "titulo": "Ojitos Lindos",
            "artista": "Bad Bunny & Bomba Estéreo",
            "url": "https://www.youtube.com/embed/10EX-_h4pYc?si=TDEA14baf4pkyWLU",
            "id": 10
        },
        {
            "titulo": "Kill Bill",
            "artista": "SZA",
            "url": "https://www.youtube.com/embed/SQnc1QibapQ?si=N7QvJHura3GIRZ9C",
            "id": 11
        },
        {
            "titulo": "Amargura",
            "artista": "Karol G",
            "url": "https://www.youtube.com/embed/fEWhm_TVvUw?si=MVnxfhcXzIvW7HQz",
            "id": 12
        },
        {
            "titulo": "Copa Vacía",
            "artista": "Shakira & Manuel Turizo",
            "url": "https://www.youtube.com/embed/oCxtsTU4BWg?si=Dc8Gu5aAslvR3yJj",
            "id": 13
        },
        {
            "titulo": "Dueño de Tu Amor",
            "artista": "Jhayco",
            "url": "https://www.youtube.com/embed/QdeoocyUk68?si=03v1HR0hESznwEK1",
            "id": 14
        },
        {
            "titulo": "Tal Vez",
            "artista": "Rauw Alejandro",
            "url": "https://www.youtube.com/embed/1Pl075mi1rA?si=jfbh_U0PeXHc1Inm",
            "id": 15
        },
        {
            "titulo": "Mi Ex Tenía Razón",
            "artista": "Karol G",
            "url": "https://www.youtube.com/embed/VBcs8DZxBGc?si=RBpAVQxQDppxLuCX",
            "id": 16
        },
        {
            "titulo": "ADMV",
            "artista": "Maluma",
            "url": "https://www.youtube.com/embed/lNBSdFw0t_w?si=zzWT3AcLIwYVeyXY",
            "id": 17
        },
        {
            "titulo": "Te Felicito",
            "artista": "Shakira & Rauw Alejandro",
            "url": "https://www.youtube.com/embed/4I25nV9hXGA?si=wZKuUXrLOCn9A2il",
            "id": 18
        },
        {
            "titulo": "Dientes",
            "artista": "J Balvin, Usher & DJ Khaled",
            "url": "https://www.youtube.com/embed/gVPgwoXm5Rc?si=emDFpNz2GKyV5yRZ",
            "id": 19
        },
        {
            "titulo": "TQG",
            "artista": "Karol G & Shakira",
            "url": "https://www.youtube.com/embed/jZGpkLElSu8?si=EgRhH8gn-aXMb3Xw",
            "id": 20
        }
    ]
}

let qtySongs = songs.length;
let arrayFlag = [];
function playSong() {
    //Reseting the array when achieve for items
    if (arrayFlag.length === 4) {
        arrayFlag = [];
    }
    //To start the array with the first value
    let randomNumber = Math.ceil(Math.random() * 10);
    if (arrayFlag.length === 0) {
        let songElem = document.getElementsByClassName("song-itemList");
        for (let i = 0; i < songElem.length; i++) {
            songElem[i].style.backgroundColor = "#ffefd5";
            songElem[i].style.borderColor = "#c3c6ce";
            songElem[i].style.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.2)";
        }
        arrayFlag.push(randomNumber);
        selectingSongs();
        return;
    }
    //Adding numbers while the array size is <=4
    else if (arrayFlag.length <= 4) {
        if (!arrayFlag.includes(randomNumber)) {
            arrayFlag.push(randomNumber);
            selectingSongs();
        }
        else {
            // Get the modal
            var modal = document.getElementById("myModal");

            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];

            modal.style.display = "block";

            // When the user clicks on <span> (x), close the modal
            span.onclick = function () {
                modal.style.display = "none";
            }

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        }
    }

    function selectingSongs() {
        switch (arrayFlag.length) {
            case 1:
                itemOfArrayFlag = arrayFlag[0];
                break;
            case 2:
                itemOfArrayFlag = arrayFlag[1];
                break;
            case 3:
                itemOfArrayFlag = arrayFlag[2];
                break;
            case 4:
                itemOfArrayFlag = arrayFlag[3];
                break;
            default:
                itemOfArrayFlag = null;
        }
        if (arrayFlag.length > 1) {
            let lastIndexOfLastSong = arrayFlag.length - 2;
            let idOfLastSong = arrayFlag[lastIndexOfLastSong] + 1;
            let lastSongElem = document.getElementById(idOfLastSong);
            lastSongElem.style.backgroundColor = "#ffefd5";
            lastSongElem.style.borderColor = "#c3c6ce";
            lastSongElem.style.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.2)";
        }
        let idOfPresentSong = itemOfArrayFlag + 1;
        let elemOfTheSong = document.getElementById(idOfPresentSong);
        elemOfTheSong.style.borderColor = "#008bf8";
        elemOfTheSong.style.boxShadow = "0 4px 18px 0 rgba(0, 0, 0, 0.25)";
        let iframe = document.getElementById("iframe");
        for (let i = 0; i < songs.canciones.length; i++) {
            if (songs.canciones[i].id === idOfPresentSong) {
                iframe.src = songs.canciones[i].url;
            }
        }

    }
}
