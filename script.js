const audioPlayer = document.querySelector('.audio-player')
const audio = new Audio("https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/backsound.mp3")
const progress = audioPlayer.querySelector('.progress');


const trackArr = [
    {name:'a1',author:'b1',path:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3'},
    {name:'a2',author:'b2',path:'https://s1.muzflix.net/files/mp3/mahmut_orhan_-_feel_(feat._sena_sener)_muzflix.net_128.mp3'},
    {name:'a3',author:'b3',path:''},
]

audio.addEventListener('loadeddata',
()=>
{
    
}
)



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