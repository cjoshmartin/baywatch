const app = {
  /*
  * @param -takes in `selectors`,  which has a `selectors.formSelector` & `selectors.listSelector` in it
  */
  init(selectors) {
    this.flicks = [] // stores the flicks and maybe a few chicks
    this.max = 0
    this.list = document.querySelector(selectors.listSelector)

    document
      .querySelector(selectors.formSelector) // takes in the form past in and selects it
      .addEventListener('submit', this.handleSubmit.bind(this)) // adds a listion for when the button with the name `submit` is clicked, then makes a called to `handleSubmit`
  }, // end of init
  refresher(){
    while(this.list.firstChild){ // removes the old state to the dom
      this.list.removeChild(this.list.firstChild)
    }
    this.list.classList.remove('animated','fadeOutDown')
    this.list.classList.add('animated','fadeInUp')

    this.flicks.map((lists, i)=>{ // push the new state to the dom
      console.log(lists)
      this.list.appendChild(this.renderListItem(lists))
    })
  },
  favorited(ev){
    const searchMovie =ev.target.dataset.flick
    // console.log(this.flicks)
    this.flicks.map((item, i)=>{
       if(item.name == searchMovie){
         item.isFavorited = !item.isFavorited
         ev.target.classList.toggle('favorited')
         if(item.isFavorited){
           ev.target.textContent = "😍"
         }
         else{
           ev.target.textContent = "Favorite"
         }
       }
    } )

    console.log(this.flicks)

  },
  remover(ev){
    const searchMovie =ev.target.dataset.flick
    this.flicks.map((item, i)=>{
       if(item.name == searchMovie){
         this.flicks.splice(i,1)
    } }) // end of map

    this.list.classList.add('animated','fadeOutDown')
    this.refresher()
  }, // end of remover
  moveUp(ev){
    // debugger
    Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
};
    const searchMovie =ev.target.dataset.flick
    this.flicks.map((item, i)=>{
       if(item.name == searchMovie && i!= 0 ){
         const pushItem = item
         this.flicks.splice(i,1)
         this.flicks.insert(i-1,pushItem)
    } }) // end of map
    this.refresher()
  },
  moveDown(ev){
    // debugger
    Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
};
    const searchMovie =ev.target.dataset.flick
    this.flicks.map((item, i)=>{
       if(item.name == searchMovie && i!= this.flicks.length ){
         const pushItem = item
         this.flicks.splice(i,1)
         this.flicks.insert(i+1,pushItem)
    } }) // end of map
    this.refresher()
  },
  /*
  * @desc - creates an entry of a flick
  * @returns - an instence of an li flick
  */
  renderListItem(flick) {
/*
    <li class="cell list-item">
          <div class="grid-x">
        <div class="medium-6 large-4 cell">
        // text
        </div>
        <div class="button-group">
        <button class="warning button">Favorite</button>
        <button class="alert button">remove</button>
        <button class="secondary button">move up</button>
        <button class="secondary button">move down</button>
        </div>
      </div>
    </li>
*/

    const item = document.createElement('li')
    item.classList.add('cell','list-item','animated')

      const divItem = document.createElement('div')
      divItem.classList.add('grid-x')

        const textDiv = document.createElement('div')
        textDiv.classList.add('auto', 'cell','text-div')
          textDiv.textContent = flick.name
          divItem.appendChild(textDiv)

        const buttonGroupDiv = document.createElement('div')
        buttonGroupDiv.classList.add('button-group')

          const favButton = document.createElement('button')
          favButton.classList.add('warning','button')
            favButton.textContent = "Favorite"
            favButton.dataset.flick = flick.name;

            favButton.addEventListener("click",this.favorited.bind(this))
            buttonGroupDiv.appendChild(favButton)

          const removeButton = document.createElement('button')
          removeButton.classList.add('alert','button')
            removeButton.textContent = "Remove"

            removeButton.dataset.flick = flick.name;
            removeButton.addEventListener('click',this.remover.bind(this))
            buttonGroupDiv.appendChild(removeButton)

          const upButton = document.createElement('button')
          upButton.classList.add('secondary','button')
            upButton.textContent = "Move Up"
            upButton.dataset.flick = flick.name;
            upButton.addEventListener('click',this.moveUp.bind(this))
            buttonGroupDiv.appendChild(upButton)

          const downButton = document.createElement('button')
          downButton.classList.add('secondary','button')
            downButton.textContent = "Move Down"
            downButton.dataset.flick = flick.name;
            downButton.addEventListener('click',this.moveDown.bind(this))
            buttonGroupDiv.appendChild(downButton)

        divItem.appendChild(textDiv)
        divItem.appendChild(buttonGroupDiv)

      item.appendChild(divItem)

    return item
  }, // end of renderListItem

  handleSubmit(ev) {
    ev.preventDefault()
    const f = ev.target
    const flick = {
      id: this.max + 1,
      name: f.flickName.value,
      isFavorited: false,
    } // end of flick obj

    this.flicks.push(flick) // puts the new flicks into the array
    // memes
    //     .sort((a,b) => (a.rating < b.rating)? 1 : -1)
    this.refresher()
    // console.log(this.flicks)

    this.max ++
  }, // end of handleSubmit
} // end of the `app` object

app.init({ // the contents of this get past to the app object.
          //  where has a function called `init`.
          // NOTE: this runs as soon as the page loads
  formSelector: 'form#flick-form',
  listSelector: '#flick-list',
})
