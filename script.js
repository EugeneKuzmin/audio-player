const audioPlayer = document.querySelector('.audio-player')
const audio = new Audio("https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/backsound.mp3")
const progress = audioPlayer.querySelector('.progress');
const progressPointer = document.querySelector('.progress-pointer');

const tracksContainer = document.querySelector('.tracks-list')
const trackName = document.querySelector('[data-trackname]')
const trackAuthor = document.querySelector('[data-trackauthor]')

const trackInfo = document.querySelector('.track-info .name')
let firstDownload = true;

const trackArr = [
    {name:'a1',artist:'b1',path:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3'},
    {name:'a2',artist:'b2',path:'https://s1.muzflix.net/files/mp3/mahmut_orhan_-_feel_(feat._sena_sener)_muzflix.net_128.mp3'},
    {name:'a3',artist:'b3',path:'https://s1.muzflix.net/files/mp3/mahmut_orhan_-_feel_(feat._sena_sener)_muzflix.net_128.mp3'},
]

audio.addEventListener('loadeddata',
()=>
{
    audioPlayer.querySelector('.time .length').textContent = getTimeCodeFromNun(audio.duration)
    audio.volume = .75
    
},false
)

const addTrackToList = (x) =>{
    const ntrack = document.createElement("li")
    ntrack.classList.add('track')
    ntrack.setAttribute('role',"track-item")
    const nTrackName = document.createElement("div")
    nTrackName.classList.add('list-track-name')
    const nTrackAuthor = document.createElement("div")
    nTrackAuthor.classList.add('list-track-author')

    nTrackName.appendChild(document.createTextNode(x.name))
    nTrackAuthor.appendChild(document.createTextNode(x.artist))
    ntrack.appendChild(nTrackName)
    ntrack.appendChild(nTrackAuthor)
    tracksContainer.appendChild(ntrack);
}

const updateTrackInfo = (indx) => {
    trackInfo.textContent = trackArr[indx].name + '  -  ' +trackArr[indx].artist
}  

trackArr.forEach(x=>addTrackToList(x))

const trackList = tracksContainer.querySelectorAll('[role="track-item"]')
trackList.forEach((el,trackitem)=>{
    el.addEventListener('click',
    ()=>{
        audio.src = trackArr[trackitem].path
        audio.load()
        audio.play()
        updateTrackInfo(trackitem)
    })
})


audio.addEventListener('timeupdate', updateProgress);

function updateProgress() {
    progress.style.width = audio.currentTime / audio.duration * 100 + "%";
    progressPointer.style.left = audio.currentTime / audio.duration * 100 - 6 + "px"
    
  }


const slider = audioPlayer.querySelector('.slider')
slider.addEventListener("click",
e => {
    const timelineWidth = window.getComputedStyle(slider).width
    const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration
    audio.currentTime = timeToSeek
},false)

//toggle between playing and pausing on button click 
const playContainer = audioPlayer.querySelector('.play-container')
const play = playContainer.querySelector('[data-play]')
const pause = playContainer.querySelector('[data-pause]')
playContainer.addEventListener('click',
()=>{
    play.classList.toggle('non-active')
    pause.classList.toggle('non-active')
    audio.paused?audio.play():audio.pause()
},false)