console.log("Welcome to the MUSIC HUB");

//Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterplay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName')
let songItem = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "X", filepath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Y", filepath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Z", filepath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "P", filepath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Q", filepath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "R", filepath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "S", filepath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "T", filepath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "U", filepath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "V", filepath: "songs/10.mp3", coverPath: "covers/10.jpg"}
]

songItem.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

//audioElement.play();

//Handle Play/Pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
    }
}) 

//listen to the event
audioElement.addEventListener('timeupdate', ()=>{
    //update seek bar
    //what percentage of progress has been done is stores in progress.
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    //updated and reflected in myProgressBar.
    myProgressBar.value = progress;
})

// to update audioElement along with the change in progressbar (deleberate)
myProgressBar.addEventListener('change', ()=>{
    //changing percentage of progress into value
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays =()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})