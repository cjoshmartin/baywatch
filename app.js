const app = {
  /*
  * @param -takes in `selectors`,  which has a `selectors.formSelector` & `selectors.listSelector` in it
  */
  async init(selectors) {
    app.flicks = [] // stores the flicks and maybe a few chicks
    app.max = 0
    app.runNumber =0

    let listItem;
    this.list = document.querySelector(selectors.listSelector)
    // debugger
    const login= document.querySelector('div.login')
    await firebase.auth().onAuthStateChanged(function(user){

      if(user){
        app.uid = firebase.auth().currentUser.uid;
        // console.log(app.uid)
        if (app.flicks.length <= 0)
        {
          firebase.database().ref('/movies/' + app.uid).once('value').then(function(snapshot) {
            if(snapshot.val() != null){
              app.flicks= snapshot.val()
              console.log(app.flicks)
            }
        }).then(function () {
          if(app.flicks != ''){
          app.max =app.flicks[app.flicks.length -1].id

          listItem= app.flicks.map((item,i)=>{
            const ilItem = app.renderListItem(item)
            document
            .querySelector(selectors.listSelector)
              .appendChild(ilItem)

        })
      }
        });

      }
      console.log(app.flicks);
        login.classList.add('template')


        app.template = document.querySelector(selectors.templateSelector)
        document
          .querySelector('#entry-bar').style.display= "inherit"

        document
          .querySelector('query')
        document
          .querySelector(selectors.formSelector) // takes in the form past in and selects it
          .addEventListener('submit', app.handleSubmit.bind(this)) // adds a listion for when the button with the name `submit` is clicked, then makes a called to `handleSubmit`
        document
          .querySelector('.sign-out-button')
          .addEventListener('click',app.signOut.bind(this))
      }
      else{
        login.classList.remove('template')
        document
          .querySelector('li.cell.list-item').classList.add('template')
        // console.log(login.querySelector(' form'));
        const loginForm = login.querySelector('form')
        loginForm.addEventListener('submit',app.signIn.bind(this))
        document
          .querySelector('.signup-button')
          .addEventListener('click',app.signUp.bind())
      }
    })
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
         try {
             firebase.database().ref().child('movies').child(app.uid).set(this.flicks)
         } catch (e) {
           console.log(e.toString())
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
    try {
        firebase.database().ref().child('movies').child(app.uid).set(this.flicks)
    } catch (e) {
      console.log(e.toString())
    }

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
}, //end of moveUp
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
  async signUp(ev){
    const login= document.querySelector('div.login')
    login.classList.add('template')

    const signup =document.querySelector('div.sign-up')
    signup.classList.remove('template')

    signup.querySelector('.login-button')
      .addEventListener('click',function (ev) {
        signup.classList.add('template')
        login.classList.remove('template')
      })
  await signup.querySelector('form')
      .addEventListener('submit',function (ev) {
        debugger
        ev.preventDefault()
        const f = ev.target;
        if(f.newPassword1.value == f.newPassword2.value){
           firebase.auth().createUserWithEmailAndPassword(ev.target.newEmail.value, f.newPassword2.value).catch(function(e){
            alert(e.code +"\n" +e.message)
          })
          signup.classList.add('template')
        }
        else{
          alert("ERROR! Passwords must match.")
        }
      })
  },
  signOut(){
    firebase.auth().signOut()
    document
      .querySelector('#entry-bar').style.display= "none"
    document
      .querySelector('li.cell.list-item').classList.add('template')
  },
  /*
  * @desc - creates an entry of a flick
  * @returns - an instence of an li flick
  */
  renderListItem(flick) {
    const item = app.template.cloneNode(true)
    item.classList.remove('template')
    item.dataset.id = flick.id
    item
      .querySelector('.text-div')
      .textContent = _.startCase(flick.name)

    item
      .querySelector('button.favorite')
      .addEventListener('click',this.favorited.bind(this,flick))
      if(flick.isFavorited){
        item.querySelector('button.favorite').textContent = "😍"
        item.querySelector('button.favorite').classList.add('favorited')
      }

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
async signIn(ev){
  // console.log(ev)
  ev.preventDefault()
  f=ev.target
  // console.log(f.emailInput.value)
  // console.log(f.passwordInput.value)
await firebase.auth().signInWithEmailAndPassword(f.emailInput.value, f.passwordInput.value).catch(function(e) {alert(e.code +"\n" +e.message)})
  window.location.reload(true); // fixes a weird bug with empty items
},
  handleSubmit(ev) {
    ev.preventDefault()
    const f = ev.target
    const flick = {
      id: ++app.max,
      name: f.flickName.value,
      isFavorited: false,
    } // end of flick obj
    console.log(app.max);

    app.flicks.unshift(flick) // puts the new flicks into the beginning of the array
    const data = app.flicks
    let listItem;
      try {
          firebase.database().ref().child('movies').child(app.uid).set(data)
      } catch (e) {
        console.log(e.toString())
      }

         listItem = app.renderListItem(flick)

    app.list
    .insertBefore(listItem,app.list.firstElementChild)
    console.log(app.flicks)

        app.runNumber++
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
