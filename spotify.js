let currentsong = new Audio();
async function getsongs() {

    let a = await fetch("http://127.0.0.1:5500/songs/")
    let response = await a.text();
    console.log(response )
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")){
            songs.push(element.href.split("/songs/")[1])
        }

    }
    return songs
}

const playmusic =(track)=>{
    currentsong.src = "/songs/" + track
    currentsong.play()

}

async function main() {
  
    let songs = await getsongs()
    console.log(songs)

  let SongUL = document.querySelector(".Songlist").getElementsByTagName("ul")[0]
  for (const song of songs) {
        SongUL.innerHTML = SongUL.innerHTML + `<li>  <img class="invert" src="song.svg" alt="">
        <div class="info">

            <div>${song.replace("%20"," ")}</div>
            <div>song artist : Hamza obaid </div>
        </div>
        <div class="playknow">
            <span>play know</span>

            <img class="invert" src="play.svg" alt="">
            
        </div>
      </li>`;

    }

  Array.from(document.querySelector(".Songlist").getElementsByTagName("li")).forEach((e)=>{
    e.addEventListener("click",(element)=>{
        console.log(e.querySelector(".info").firstElementChild.innerHTML)
        playmusic(e.querySelector(".info").firstElementChild.innerHTML.trim())

    })

  })


}
main()