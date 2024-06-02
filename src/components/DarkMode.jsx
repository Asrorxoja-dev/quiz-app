
import './darkMode.css'


function DarkMode() {
  const setDarkMode = ()=>{
    document.querySelector("body").setAttribute('data-theme', 'dark')
    localStorage.setItem("selectedTheme", "dark")
  }

  const setLightMode = ()=>{
    document.querySelector("body").setAttribute('data-theme', 'light')
    localStorage.setItem("selectedTheme", "light")

  }


  const selectedTheme = localStorage.getItem("selectedTheme")
  if(selectedTheme === "dark"){
    setDarkMode()
  }
const toggleTheme = (e) =>{
  if(e.target.checked) setDarkMode()
    else setLightMode()
}

  
  return (
    <div className='dark-mode_container'>

<input defaultChecked={selectedTheme === "dark"} type="checkbox" className='dark_mode_input' onChange={toggleTheme} id='darkmode-toggle' />

<label className='dark_mode_label' htmlFor='darkmode-toggle'></label>
    </div>
  )
}

export default DarkMode