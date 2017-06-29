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

  /*
  * @desc - creates an entry of a flick
  * @returns - an instence of an li flick
  */
  renderListItem(flick) {
    const item = document.createElement('li')
    item.textContent = flick.name
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

    this.flicks.push(flick)
    // debugger
    while(this.list.firstChild){ // removes the old state to the dom
      this.list.removeChild(this.list.firstChild)
    }
    this.flicks.map((lists, i)=>{ // push the new state to the dom
      // console.log(lists)
      this.list.appendChild(this.renderListItem(lists))
    })
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
