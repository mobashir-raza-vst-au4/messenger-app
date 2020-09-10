import './App.css';
import React, { Component } from 'react'
import { IconButton, FormControl, InputLabel, Input  } from '@material-ui/core';
import Message from './Components/Message';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';

export default class App extends Component {

  state = {
    input: "",
    messages: [],
    username: ""
  }

  componentWillMount = () => {
    // console.log("CWL>>>")

    db.collection('messages')
    .orderBy('timestamp', 'asc')
    .onSnapshot(snapshot => {
      // console.log("snap>>",snapshot)
      this.setState({
        messages: (snapshot.docs.map(doc => ({id: doc.id, message:doc.data()})))
      })
    }) 
  }

  
  componentDidMount = () => {
    const name = prompt("Please enter your name");
    console.log("NAME",name)
    if(name === null) {
      return false;
    }
      this.setState({
        username: name.toLocaleLowerCase()
      })
  }
      


  handleInput = (e) => {
    const value = e.target.value;
    this.setState({
      input: value
    })
  }

  sendMessages = (e) => {
    e.preventDefault()

    db.collection('messages').add({
      message: this.state.input,
      username: this.state.username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()

    })
    this.setState({
      // messages: [...this.state.messages, {username: this.state.username, message: this.state.input}],
      input: ""

    })
  }
  render() {
    return (
      <div className="App">
        <img className="app__image" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAOEA8NDhAPEA8QFRgPEA4PDw8PDQ8QFhEXFxgSFxUYHSggGRolGxMTIz0hJSkrMS4uFx8/Oj8sOigtLi4BCgoKDg0OGxAQFy0mHyUtLSstLi0rLy4tMC8tLS0tLS0tNS0tLS8uMC0tLS8tLS8wLS0rLzItLS0tKzIyLy0yLf/AABEIAOEA4QMBEQACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABQcDBAYBAgj/xABAEAACAgEBBAYIAgYKAwAAAAAAAQIDEQQFBiExEkFRYXGBBxMiMlKRobFCwSNicpLC0RQzQ1OCg6PS4fAkc6L/xAAbAQEAAwEBAQEAAAAAAAAAAAAABAUGAwECB//EADcRAQACAQEFBQcDAwMFAAAAAAABAgMEBRESITFBUXHR8BMiMmGRobGBweEVQvEGIzMUJENScv/aAAwDAQACEQMRAD8AvEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADT1u1KKP662EH8Llmf7q4nbFp8uX4KzKPm1eHD/wAl4j8/RB6rfjTRyq422d6ShF/N5+hOpsnNPxTEevXaq8u3tPXlWJn7R9/JGXb/AE/waeC/ascvskSq7Hr/AHX+yHb/AFDb+3H9/wCGtLfrVdUKF/hm/wCI6xsjD3z9vJwnb+o7K1+k+bxb86rrhR+5P/cP6Rh75+3k8/r+p/8AWv0nzbNW/ti9+iD/AGZyj90znbY9Oy8/R3r/AKhv/djj6/5SOm3608sKyu2HeujOK+qf0I19kZY+G0T9kvHt/Bb46zH39fRN6HbWmvwqroSb/C30Z/uvDIOXS5sXxVlaYddp83wXifl2/SUgR0oAAAAAAAAAAAAAAAAAAAABB7a3o0+lzDPrbVw9XBrg/wBaXJfVk7TbPy5ufSO+f2Vms2rg0/Lfvt3R+/d+fk4ram9eq1GUp+ph8FWYvHfLm/oXeDZ2HFzmN8/Nm9TtfUZuUTwx8vPqg288Seq55vAGQAABkAAAl9mbyarTYUbHOC/s7czjjsXWvJkPNocOXrXdPfHJYabampwcotvjunm7PY2+FGoxC39BY+GJPNcn3S/njzKXUbMy4udfej7/AEaPR7Zw5/dv7s/Pp9XSFauAAAAAAAAAAAAAAAABi1OohVCVlklCEeLlJ4SPqlLXtw1jfL4yZK46za87ohXu8O+Fl+atPmqrk58rbF4/hXcv+DRaTZlMfvZOc/aPNlNfti+XfTDyr39s+TlslqozIDIDIDIDIDIDIDIDIDIDIHQbv7026TEJ5to5dBv2oL9R/ly8Cv1ez8ef3o5W7/Na6HauXT7q2517u7w8lj7P19WpgraZKUX84v4WupmbzYb4rcN43S1+DPjz048c74bJydgAAAAAAAAAAAAMGt1cKK5XWyUYRWW/yXa+46YsdslopWOcueXLTFSb3ndEKs3i2/ZrZ5eY1Rf6OrqX6z7ZfY1Wj0dNPXvntlitfr76q/dWOkfvPzRBMV4AAAMgAAAAAAAMgAAG/sba9ujsVlT4PhOD9ycex/z6iPqdNTPTht+k9yVpNXk01+On6x3rV2RtOvV1K6p8HwlF+9CXXFmU1GnvgvwW/wAtvptTTUY4vT/DdOCQAAAAAAAAAAHkpJJttJLi2+CS7REb+UPJndzlVm9u33rLejBtUVvEFy6b/vGvt2LxZq9Bo409N9vinr5MZtPXzqcm6vwx0+fz8kBknqsyAyAyAyAyAyAyAyAyAyAyAyAyAyAyBKbvbanorlZHLhL2ba/ij/NdX/JF1elrqMfDPXslN0OstpcvFHTtj19ltabURthG2tqUJpSjJdaZkb0tS01tHOG4x3resWrPKWU+X2AAAAAAAAAON9IO2vVwWjrft2LpWtc1X1R839F3lzsnS8dva26R08f4UW2tZwU9jXrPXw/lXhomVMgMgAGQGQGQGQGQGQGQGQGQGQGQADIDIHa+j3bXRk9FY/ZnmVTfVPm4+fPxT7Sk2tpd9fbV6x182h2JrN0+wt0np5LAM+0wAAAAAAABj1F0a4Tsm8RgnOT7Elln1Sk3tFY6y+b3ilZtbpHNS209dLU3WXz52ScsfCuqPksLyNrhxRixxSOxgtRmtmyWyW7Wtk6uJkBkBkPHmQ9e5AZDwyHpkBkBkPDIemQGQ8Mh68yB7kBkD6ptlCUZwbUotSjJc1JPKZ82rFoms9Je0tNLRavWF0bH161NFV8fxxy18MuUo+TTMXqMM4ck0nsb3TZozYq5I7fUtw4u4AAAAAADlfSLr/VaVUp+1fLo9/Qj7Uvr0V5lrsjDx5uOf7Y+8qjbWbgwcEdbT9lY5NQyJkBkBkBkBkBkBkBkBkBkBkBkBkBkDJRTKyUa64uc5PEYxTcm/A+bWrSOK07ofdKWvaK1jfMtzaextTpVGWoqlCMuClmMo57MxbSfcccOqw5pmMdt+52z6PNgiJyV3b/XYj8khGMh6ZDx3/oy1+Y3aVv3WrYeD4S+vR+bM/trDumuSPCf2aXYWbfW2KeznH7u5KJoAAAAAAAFZeknV9PVQqzwqrXDslJ5f06Jp9jY+HBNu+fx6lldt5OLPFO6Pz6hyWS3UxkBkBkBkBkDY0Oks1FkKao9Kc3hL832JHPLkripN7zyh0w4bZbxSkc5WLsvcPTVxT1DldPrSlKFafco4fzfyM5n2xmtP+3yj6y02DYuGkf7nvT9I+zPrtx9HZFquM6ZdUoTlJZ74yb4eGDni2tqKz70748PJ0y7H01492N0/KfNX+3dhXaKfRtWYN+xbH3J/wAn3M0Ol1ePUV31nn2x2s5q9Fk01t1o5dk9iLySkQyAyAyBI7F2NdrZ9CmPBe/Y+FcF3vt7uZG1Oqx6evFefCO2UnS6PJqLcNI5ds9kLS3f3ep0McQXSsa9u6S9uXcvhXd9zLavW5NRPvco7Ia7R6HHpq7q857ZRPpG2hCGmWmfGy5ppfDGMk3L6Y832EvY+G1s3tOyP3Q9tZ61w+z7bfsrLJp2UMgMgT25Gr9VrqePCzNT7+kuH/0okDaePj01vlz+n8LHZWTg1Nfny9fqtwyDZAAAAAAAKa3tv9ZrtVLsscP3Eofwmz0FOHTUj5b/AK82J2jfj1N5+e76ckTkmIZkBkBkBkBkCzfR9sP1FX9KsX6W5ewnzhVzXnLg/DBmNrav2l/ZV6R+f4arZGj9lT2to52+0fy64p1wAYtVpoXQlXbGM4S4OMllM+6ZLUtxVndL4vjrevDaN8K23n3Mnp+ldpulZTzcOdtS/ij38/uaTRbUrl9zLyt9p8mZ12ybYt98XOvd2x5uRyXCme5A6jdfdCzV9G67NWn5p8rLV+qupd/yyVWt2nTB7lOdvtHj5LbQ7Ltn3Xvyr959d6zNFo66IRqpgoQjyivu31vvZmcuW+W3Fed8tRixUxVilI3RD3WaqFNc7rHiEE5SfcvzPMeO2S0Ur1l7kyVx1m9ukKX21tOervnfP8TxGPVCC5R/715NpptPXBjilfUsRqtRbUZZvb1DSySEcyAyBn0F/qrarfgnGf7sk/yOeWnHS1e+Jh0w24Mlbd0xK9DCN8AAAAAAAo7bMs6nUvttsf8AqM3Onjdhp4R+GF1P/Nfxn8tM7OAAAAMgdBuXsP8ApuoTmv0FWJ2dkn1V+ePkmV+0dX/0+Ll8U9PNY7N0ft8u+3wx18luoyDYAAAAA5LeTcmvUt26ZxptfGUWn6mx9rS9196LfR7Vvijhyc4+8eao1uyaZp4sfK32nyYd3dxYUyVurcLpr3a4pulPteV7XhjHifer2vbJHDijdHf2/wAPjR7Irjniyzvnu7P5dmUq6AK49I23fWTWiqfsVvNzXKVnVDwX38DSbH0fDX21o5z08O/9fXVm9savit7Gs8o6+Pd+nro4ku1EAMgADZ6L6oeYxfak/oYG0bpl+gV6Q+z5egAAAAAUZtpY1OpXZdYv9Rm603PDTwj8MNqY/wB6/jP5aeTs4GQGQGQMmnplZONdacpzajGK5tt8EfN7RSs2tPKH1Sk3tFaxzldG7uyI6LTwojhy96ya/HY+b8OrwSMVq9TOoyzef08G10mmrp8UUj9fFJkZJAAAAAAAAITe3ba0OnlNY9bP2KY/rfFjsXP5dpN0GknUZd09I5z6+aFrtVGnxTbtnlHr5KcnNtuTbbby23ltvm2zZxERG6GNmZmd8vMh4ZAAMgGei/KFiMV2JL6GAtO+0t/XpD7Pl6AAAAABSu91Pq9dqo9tjn++lP8AiNrs+3HpqT8t305MZtCnDqbx89/15ojJMQzIDIDIFhejbYWE9fauLzGhPqXKVn3S8+0z22dZ/wCCv6/tH7tDsfR7o9taPDzd+Z9fMGt1ldEJW3TjCEecpPh4d77kdMeK+S0VpG+XxkyVx1m153QrHeffW3Ut1aZypoX4k3G6zvbXuruXn2Gn0WyqYo4snO32hmtbtS+WeHHyr95aWwN7NRo5rMpXVP3qrJN+cW/df0O+r2diz15Runvj93DS7Ry4bc53x3T+y0tjbYp1tfraJZ+KD4WVvskur7GV1Glyae3DePKWo0+px568VJ84SBHdwAB82TUU5SaUYpylJ8EklltnsRMzuh5MxEb5UxvVtt67USt4qqPsUx7IJ+9jtfP5dhtNDpI0+KK9vWfH+GN12qnUZZt2Ryj180PkmIZkBkBkBkDPoKfW21Vf3k4w/ekl+Z8ZbcFLW7omXTDTjyVr3zEL6MC3YAAAAAACrPSdpOhq4W44W1rj2yi+i/p0DVbFycWCa90/n1LMbZx7s0W74/DkC4VAAAld2NjS12ohSsqC9u2a/DWufm+S8SJrdVGnxTft7PFL0WlnUZYr2dvguqmqMIxhBKMYpRjFclFLCSMTa02mbT1lsq1isREdEVvFvFRoIZsfSsa9imLXTl3v4V3v6kvSaHJqbe707ZRdVrMenrvt17IVRt3bt+un07peyvcqjwrgu5db72a3S6PHp67qR4z2yy2q1eTUW32nl2R2IwkooBs7P19umsV1E3Ca61ya7GuTXcznlw0y14Lxvh1w5r4rcdJ3StHdbfGrWdGq3FWp+H+zsfbBvr/VfHxMrrtmX0/vV51+8ePm0+i2jTP7tuVvz4eTqCrWQBwXpI3gUY/0CqXtS43tP3Y81X4vm+7HaX+x9Fvn2945dnmo9r6zdHsazznr5K6NGzoAAAAAE/uLpPXa+jhwrzbLu6K4P95xK/amTg01vny+v8LDZmPj1Nflz9fquMxrXAAAAAAAOQ9Jmz/W6SN8V7VEuk+31cvZl9eg/IuNi5uDPwT/AHR949Sqtr4ePDxR/b+FVZNWy5kBkCwfRjtHT1wuqsnCu6UlJObUenBRSSTfPD6XDvM9trBlvatqxM13dnZK/wBj5cda2rM7p3/Zvb1b8wozTo3G27k7feqr8Pil9PscNDsi2T383Kvd2z5fl31u1K4/cxc7d/ZHmrTU6ids5WWSlOcnmUpPMmzTUpWlYrWN0Qzd72vabWnfMsZ9PkyAyAyATxxQ3Pejqtl7+6uiKhPoXxXBOzPrF/iXPzyyqz7HwZJ31318On0WeDa2bHG63vePVk2j6QdXbFwrVdCfOUE5WeTfBfI+cOxcFJ32mbfh9Zdr5rxurER+XJTm5Nyk223ltvLbfNtltEREboVUzMzvl5k9eGQADIDIDIFi+irZ+I36tr3sUwfcval9eh8mZzbubnXFHjP7fu0GxcO6LZJ8I/d35n16AAAAAAAxarTxthOqazCcXCS7U1hn1S80tFq9Y5vm9YvWaz0lRG1NDLTXW6ez3q5OOfiXVLwaw/M3uDLXNjjJXpLFZsU4sk0nsap1cgAAAAAAAAAAAAAAAAAAAPumuU5RrgnKc2oxiubk3hL5nza0VibT0h9VrNpiI6yvXYezlpNPTp44fq44k1+Kb4yl5tswmpzzny2yT2/jsbTT4Yw44pHY3jg7AAAAAAAAHCek3YTsgtdUvaqXRuSXGVeeEv8AC38n3F9sXV8NvY26T08e79fXVTbW0vHX2tesdfD+FZZNOzpkBkBkBkBkBkBkBkBkBkBkBkBkBkBkBkBkDvPRlsJzm9fYvYrzGlP8VnJz8EuHi+4oNtazhr7CvWevh3fr66rvZOl3z7a3Z0WYZloAAAAAAAAAB5OKknFpNNYaaymn1NHsTMTvgmN/JTW+u7b0F3Sgm9NY81y59B9dbfaurtXgzZ7N10anHut8UdfNldfo/YX31+Genk5wskAyAAAMgMgAGQGQAABkBkAAyAyBLbsbCnr71VHKgvatsxwhD/c+SX8mQ9bq66bHxT17I759dUrSaW2oycMdO2V26PSwprhTVFRhBKMYrqS/PvMRkyWyWm9p5y1tKVpWK16QzHw+gAAAAAAAAAA1tpaCvU1TouipVzWGutdjT6mu064c18N4vSd0w+MmOuSs1tHKVM707uW7Ps6Mszpk/wBFdjhJfC+yXcbTQ66mqpvjlaOseuxldXo7ae3y7JQeSciGTwMh4ZD0yAyHhkPTJ6GTwMgMgMgMnoZPBJbB2LdrrVTSu+dj9yuPa3+XWRtVqsempx3nwjtl302mvnvw1/We5dGwtjVaGmNFK75zfv2T65P/ALwMXqtVfUZOO/8Ahq9PgphpwVSJGdgAAAAAAAAAAAAILfjTxs2fqlJZ6MPWR7VKDymvl9Sfsy801VN3bO76omupFsFonuUfk3DJmQGQGQGQGQGQGQGQGQGQGQGQOm3X3Ov1zVks06frtkvamuyC6/Hl48is1208Wm92Odu7u8fW9P0uz75uc8q+ui2tk7Lp0dapogoRXFvnKcvik+tmR1GoyZ78eSd8+ujR4cNMVeGkcm6cXUAAAAAAAAAAAAABFb1rOh1v/osfyrbJehn/ALnH/wDUflw1Uf7N/CVC5N6yAAyAyAyB7kBkDzIAD3IHmQJzY26mt1mHXU4wf9rbmuvHas8ZeSZB1G0dPg+K2+e6Oc+vFLw6HNl6RujvlYe7/o/02mxZqP8AybVx9pYpi+6HX558EZ3V7ZzZfdx+7H3+vkudPszHj525z9nYJFOsgAAAAAAAAAAAAAAABpbb08rdNqaYcZWVWVxXbKVbS+53014pmpeekTE/SXPNWbY7Vjtifw/PjyuDWGuDT4NPsP0JjpjdyfdNUrJKFcZTnLhGEIuU5PuS4s+bWiscVp3Q9rWbTuiHZbE9HOquxPUyWmhz6PCdzX7KeI+b8im1O3MOPljjin6R69b1ng2VktzvO6Pu7XS7h7OhDoOl2Prsssn033+y0l5JFJfbGrtbfFt3yiI3LSuztPWu7h3o7XejTSTy6bLqX2ZjZBeT4/Uk4tvZ6/HWJ+3r6OF9lYZ+GZhDaj0XXL+r1VU/2651/ZyJtP8AUGOfixzHhO/yRrbIt/bf7NKXo11y5T0z/wAyxfwHaNu6but9I83L+k5u+PX6EfRrr/i0y/zLP9g/rum7rfSPM/pObvj1+jbo9F+of9ZqaY/sRnZ9+icrf6gxR8NJnx3R5uldkX7bQl9F6MdPHDuvutfZBRqg/Li/qQ8m38s/BSI+/l+EmmyccfFaZ+zpNmbs6LS4dOnrUlynJessXhKWWvIrc2v1Gble87u7pH2TcWlw4/hrCXIaQAAAAAAAAAAAAAAAAAAABz+1dzNDqrHdZU1ZLjKVc5Q6b7Wlwz38ywwbU1OGvBW3L5xvRMuiw5LcVq80lsrY+n0kehp6oVrraWZy8ZPi/NkbPqcued+S0y7YsNMUbqRubxwdQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf//Z" />
        <h1>Messenger App</h1>
        <h5>Welcome {this.state.username}</h5>
        <form className="app__form">
          <FormControl className="app__formControl">
              <Input className="app__Input" placeholder="Type a message and press Enter" value={this.state.input} onChange={(e) => {this.handleInput(e)}} />
              <IconButton className="app__IconButton" disabled={!this.state.input} type="submit" variant="contained" color="primary" onClick={this.sendMessages}>
                <SendIcon />
              </IconButton>
          </FormControl>
        </form>
          {/* messages shown */}
          <FlipMove>
          {this.state.messages && this.state.messages.map((message, index) => {
            console.log(this.state.messages)
            return (
              
              <Message key={message.id} messages={message.message} username={this.state.username}/>
              
            )
          })}
          </FlipMove>
      </div>
    )
  }
}


