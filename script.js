const audioPlayer = document.querySelector('.audio-player')
const audio = new Audio("./sound/Pendant_que_les_champs_brûlent.mp3")
const volumePercentage = audioPlayer.querySelector('.volume-percentage');
const nextBtn = audioPlayer.querySelector('.next-next');
const previousBtn = audioPlayer.querySelector('.previous-previous');
const cover = document.querySelector('.cover');
const currentTime = document.querySelector('.current-time');
const trackLength = document.querySelector('.track-length');
const playerTrackName = document.querySelector('.track-name');
const playerTrackArtist = document.querySelector('.artist-name');

const playContainer = audioPlayer.querySelector('.play-container')
const play = playContainer.querySelector('[data-play]')
const pause = playContainer.querySelector('[data-pause]')

const tracksContainer = document.querySelector('.tracks-list')
const trackName = document.querySelector('[data-trackname]')
const trackAuthor = document.querySelector('[data-trackauthor]')

const trackInfo = document.querySelector('.track-info .name')
const timerange = document.querySelector('#timerange')


let currentTrack = 0;

const trackArr = [
    {name:'Pendant que les champs brûlent',artist:'Niagara',path:'./sound/Pendant_que_les_champs_brûlent.mp3',cover:'./img/ZoVlCW5nVIQ.jpg'},
    {name:'Feel',artist:'Mahmut Orhan feat Sena Sener',path:'./sound/mahmut_orhan_-_feel_(feat._sena_sener).mp3',cover:'./img/400x400bb.jpg'},
    {name:'Fade',artist:'Alan Walker',path:'./sound/Alan Walker - Fade (Original Mix).mp3',cover:'./img/alan-walker-faded.jpg'},
]

audio.addEventListener('loadeddata',
()=>
{
    trackLength.textContent = getTimeCodeFromNun(audio.duration)
    
    
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
    playerTrackName.textContent = trackArr[indx].name
    playerTrackArtist.textContent = trackArr[indx].artist
}  

const updatePicture = (indx) => {
    cover.style.backgroundImage = `url(${trackArr[indx].cover})`;
}  

const updateTrackList = (indx) => {
    trackList.forEach(x=>x.classList.remove('active'))
    trackList[indx].classList.add('active')
}  

trackArr.forEach(x=>addTrackToList(x))

const trackList = tracksContainer.querySelectorAll('[role="track-item"]')
trackList.forEach((el,trackitem)=>{
    el.addEventListener('click',
    ()=>{
        audio.src = trackArr[trackitem].path
        audio.load()
        audio.play()
        play.classList.remove('non-active')
        pause.classList.add('non-active')
        cover.classList.add('play-on')
        updateTrackInfo(trackitem)
        updatePicture(trackitem)
        updateTrackList(trackitem)
        currentTrack = trackitem
    })
})

const initialSettings = () => {
    updatePicture(0)
    updateTrackList(0)
    updateTrackInfo(0)
    audio.volume = .5
}

const startPlay = (i) => {
    audio.src = trackArr[i].path
    audio.load()
    audio.play()
    cover.classList.add('play-on')
    play.classList.remove('non-active')
    pause.classList.add('non-active')
    updateTrackInfo(i)
    updatePicture(i)
    updateTrackList(i)
    timerange.value = 0
}

//next button
nextBtn.addEventListener('click',()=>{
    currentTrack==trackArr.length-1?currentTrack=0:currentTrack++
    startPlay(currentTrack)
})
//privious button

previousBtn.addEventListener('click',()=>{

    currentTrack==0?currentTrack=trackArr.length-1:currentTrack--
    startPlay(currentTrack)

})


//update time scrolls & time info
audio.addEventListener('timeupdate', updateProgress);

function updateProgress() {
    timerange.value = audio.currentTime / audio.duration
}

setInterval(()=>{
    currentTime.textContent = getTimeCodeFromNun(audio.currentTime)
},500)

timerange.addEventListener('input',
()=>{
    audio.removeEventListener('timeupdate',updateProgress)
})
timerange.addEventListener('mouseup',
()=>{
    audio.addEventListener('timeupdate', updateProgress);
})

//on playing audio end event
audio.addEventListener("ended",
()=>{
    setTimeout(()=>
    {
        currentTrack==trackArr.length-1?currentTrack=0:currentTrack++
        startPlay(currentTrack)

    },2000)
}
)
    

//slider listener
const slider = audioPlayer.querySelector('.slider')
slider.addEventListener("click",
e => {
    const timelineWidth = window.getComputedStyle(slider).width
    const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration
    audio.currentTime = timeToSeek
},false)

//toggle between playing and pausing on button click 

playContainer.addEventListener('click',
()=>{
    play.classList.toggle('non-active')
    pause.classList.toggle('non-active')
    cover.classList.toggle('play-on')
    audio.paused?audio.play():audio.pause()
    timerange.value = 0
})

//sound
loudSpeaker = document.querySelector('[data-speaker]')
loudSpeakerOff = document.querySelector('[data-speaker-off]')

audioPlayer.querySelector('.loud-speaker').addEventListener('click',()=>{
    audio.muted = !audio.muted
    loudSpeaker.classList.toggle('non-active')
    loudSpeakerOff.classList.toggle('non-active')

})

const volumeTracker = audioPlayer.querySelector(".volume-tracker");
volumeTracker.addEventListener('click', e => {
  const trackerWidth = window.getComputedStyle(volumeTracker).width;
  const newVolume = e.offsetX / parseInt(trackerWidth);
  audio.volume = newVolume;
  volumePercentage.style.width = newVolume * 100 + '%';
})

function getTimeCodeFromNun(num){
    let seconds = parseInt(num)
    let minutes = parseInt(seconds / 60)
    seconds -= minutes * 60
    const hours = parseInt(minutes / 60)
    minutes -= hours * 60
    if( hours === 0) return `${minutes}:${String(seconds % 60).padStart(2,0)}`
    return `${String(hours).padStart(2,0)}:${minutes}:${String(seconds % 60).padStart(2,0)}`

}

initialSettings()