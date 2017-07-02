const app = {
  /*
  * @param -takes in `selectors`,  which has a `selectors.formSelector` & `selectors.listSelector` in it
  */
  async init(selectors) {
    this.flicks = [] // stores the flicks and maybe a few chicks
    this.max = 0
    // debugger
    await firebase.auth().onAuthStateChanged(function(user){
      // console.log(user)
      if(user){
        this.list = document.querySelector(selectors.listSelector)
        this.template = document.querySelector(selectors.templateSelector)
        document
          .querySelector('#entry-bar').style.display= "inherit"
        document
          .querySelector('query')
        document
          .querySelector(selectors.formSelector) // takes in the form past in and selects it
          .addEventListener('submit', this.handleSubmit.bind(this)) // adds a listion for when the button with the name `submit` is clicked, then makes a called to `handleSubmit`
      }
      else{
        // debugger
        const login= document.querySelector('div.login')
        login.classList.remove('template')
        // console.log(login.querySelector(' form'));
        const loginForm = login.querySelector('form')
        loginForm.addEventListener('submit',app.logging.bind(this))
      }
    }).bind(this)
  }, // end of init
  favorited(flick,ev){
    const listItem = ev.target
    // debugger
         flick.isFavorited =listItem.classList.toggle('favorited')

         if(flick.isFavorited){
           ev.target.textContent = "😍"
         }
         else{
           ev.target.textContent = "Favorite"
         }

  },// end of favorited
  remover(flick,ev){
    // remove from screen
    console.log(ev)
    const listItem =ev.target.closest('.list-item')
    listItem.remove()


    // remove from array
    const i = this. flicks.indexOf(flick)
    this.flicks.splice(i,1)
  }, // end of remover
  moveUp(ev){
    const listItem =ev.target.closest('.list-item')
    const parentItem = listItem.parentNode
    // debugger
    if(parentItem.firstElementChild == listItem){
      console.log("You can't move it like that!!!");
    }
    else{
    const preItem = listItem.previousSibling
    const moveItem= listItem;

    parentItem.insertBefore(preItem,listItem)
    listItem.remove()
    parentItem.insertBefore(moveItem,preItem)
  }

  },
  moveDown(ev){
    // debugger
    const listItem =ev.target.closest('.list-item')
    const parentItem = listItem.parentNode

    if(parentItem.lastElementChild == listItem){
      console.log("You can't move it like that!!!");
    }
    else{
    const preItem = listItem.nextSibling
    const moveItem= listItem;
    parentItem.insertBefore(moveItem,preItem)
    preItem.remove()
    parentItem.insertBefore(preItem,listItem)
    }
  },
  /*
  * @desc - creates an entry of a flick
  * @returns - an instence of an li flick
  */
  renderListItem(flick) {
    const item = this.template.cloneNode(true)
    item.classList.remove('template')
    item.dataset.id = flick.id
    item
      .querySelector('.text-div')
      .textContent = _.startCase(flick.name)

    item
      .querySelector('button.favorite')
      .addEventListener('click',this.favorited.bind(this,flick))

    item
      .querySelector('button.remove')
      .addEventListener('click',this.remover.bind(this,flick))

    item
      .querySelector('button.move-up')
      .addEventListener('click', this.moveUp.bind(this))

    item
      .querySelector('button.move-down')
      .addEventListener('click', this.moveDown.bind(this))
    return item
  }, // end of renderListItem
logging(ev){
  // console.log(ev)
  ev.preventDefault()
  f=ev.target
  console.log(f.emailinput)
},
  handleSubmit(ev) {
    ev.preventDefault()
    const f = ev.target

    const flick = {
      id: this.max + 1,
      name: f.flickName.value,
      isFavorited: false,
    } // end of flick obj
    // f.flickName.value =""
    this.flicks.unshift(flick) // puts the new flicks into the beginning of the array

    const listItem = this.renderListItem(flick)
    this.list
    .insertBefore(listItem,this.list.firstElementChild)
    // console.log(this.flicks)

    this.max ++
    f.reset()
  }, // end of handleSubmit
} // end of the `app` object

app.init({ // the contents of this get past to the app object.
          //  where has a function called `init`.
          // NOTE: this runs as soon as the page loads
  formSelector: 'form#flick-form',
  listSelector: '#flick-list',
  templateSelector: '.list-item.template',
})
