import React from 'react';
import axios from 'axios'
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Image,
  Animated,
  VrButton,
  StyleSheet
} from 'react-vr';

export default class Horus extends React.Component {
  constructor(props){
    super(props)
    this.state={
      page  : 'Home',
      room  : 'homescreen2.jpg',
      limit : 3,
      space : 3,
      start : 1,
      index : 0,
      isSelect: false
    }
  }

  move(page,room){
    console.log(page,room);
    this.setState({
      page: page,
      room: room
    })
  }

  backButton(){
    return(
      <View>
        <VrButton onClick={()=> this.move('Home','homescreen2.jpg')}
          style={{
            transform: [{translate: [-2.7, 1.5, -3]},
                        {rotateX: 0},
                        {rotateY: 0}]
          }}>
          <Image source={asset('BackNew.png')}
            style={{
              width: 1.2,
              height: 0.4,
            }} />
        </VrButton>
       </View>
    )
  }

  flights(){
    let flights = []
    for(let i =this.state.start; i < this.state.limit; i++){
      let which = i + 1
      flights.push(
        <VrButton
          key={i}
          style={{
            margin   : 0.2,
            transform: [{translate: [-1.2, 5.5, -6]},
                        {rotateX: 0},
                        {rotateY: -30}]
          }}
          onClick={()=>this.move('1','1.jpg')}>
          <Image source={asset(`TicketFlight`+ which + '.jpg')}
            style={{
              width: 7.5,
              height: 4,
            }} />
        </VrButton>
      )
    }
    return(flights)
  }

  next(){
    this.setState({
      start: this.state.start + this.state.space,
      limit: this.state.limit + this.state.space
    })
  }

  back(){
    this.setState({
      start: this.state.start - this.state.space,
      limit: this.state.limit - this.state.space
    })
    console.log(this.state.start);
  }

  bookseat(){
    this.setState({
      isSelect: true
    })
    axios.post(`http://localhost:3000/sendEmail`,{
      image: 'https://i.imgur.com/VQ972Fv.jpg'
    })
    .then(res=>{
      console.log('success')
    })
  }

  render() {
    return (
      <View>
        <Pano source={asset(this.state.room)} />
        {(this.state.page === 'Home')
        ?  <View>
              <VrButton
                style={{
                  transform: [{translate: [-0.5, 4, -7]},
                              {rotateX: 0},
                              {rotateY: 0}]
                }}>
                <Image source={asset('Logo.png')}
                  style={{
                    width: 1.1,
                    height: 1.1,
                  }} />
              </VrButton>
              <VrButton onClick={()=> this.move('Flight','Resepsionist.jpeg')}
                style={{
                  transform: [{translate: [-3, 2, -4]},
                              {rotateX: 0},
                              {rotateY: 0}]
                }}>
                <Image source={asset('Flight.png')}
                  style={{
                    width: 1,
                    height: 1,
                  }} />
              </VrButton>
              <VrButton onClick={()=> this.move('Hotel','HotelRoom2.jpg')}
                style={{
                  transform: [{translate: [-0.5, 3, -4]},
                              {rotateX: 0},
                              {rotateY: 0}]
                }}>
              <Image source={asset('Hotel.png')}
                style={{
                  width: 1,
                  height: 1,
                }} />
              </VrButton>
              <VrButton onClick={()=> this.move('Restaurant','Restaurant3.jpg')}
                style={{
                  transform: [{translate: [2, 4, -4]},
                              {rotateX: 0},
                              {rotateY: 170}]
                }}>
              <Image  source={asset('FnB.png')}
                style={{
                  width: 1,
                  height: 1,
                }} />
              </VrButton>
              </View>
         : null
        }
        {(this.state.page === 'Flight')
        ?  <View>
          {(this.state.limit < 6)
             ? <VrButton onClick={()=> this.next()}
             style={{
               transform: [{translate: [6.2, 0.2, -2.5]},
                           {rotateX: 0},
                           {rotateY: -30}]}}>
                <Image
                 source={asset('ARROWRIGHT.png')}
                 style={{width : 0.7,
                         height: 0.7}} />
              </VrButton>
             :null
            }
             {(this.state.start > 0)
             ?<VrButton onClick={()=> this.back()}
                style={{
                  transform: [{translate: [-1.2, 0.6, -7]},
                              {rotateX: 0},
                              {rotateY: 0}]}}>
                <Image
                 source={asset('ARROWLEFT.png')}
                 style={{width: 0.7,
                         height: 0.7}}/>
              </VrButton>
             :null
            }
             {this.flights()}
             {this.backButton()}
           </View>
         : null
        }
        {(this.state.page === 'Hotel')
         ? this.backButton()
         : null
        }
        {(this.state.page === 'Restaurant')
         ? this.backButton()
         : null
        }
        {(this.state.page === '1')
         ? <View>
            {this.backButton()}
            <VrButton onClick={()=> this.move('2','2.jpg')}
               style={{
                 opacity: 0.5,
                 transform: [{translate: [-12.2, -3, -4.7]},
                             {rotateX: 0},
                             {rotateY: 60}]}}>
               <Image
                source={asset('up-arrow.png')}
                style={{width: 2.5,
                        height: 2.5}}/>
             </VrButton>
             <VrButton onClick={()=> this.bookseat()}
               style={{
                 transform: [{translate: [-8,3,-4.5]},
                             {rotateX: 0},
                             {rotateY: 110}]
               }}>
             <Image source={asset('4C.png')}
               style={{
                 width: 0.3,
                 height: 0.3,
               }} />
             </VrButton>
             <VrButton onClick={()=> this.bookseat()}
               style={{
                 transform: [{translate: [-8,3.3,1.8]},
                             {rotateX: 0},
                             {rotateY: 150}]
               }}>
             <Image source={asset('1A.png')}
               style={{
                 width: 1,
                 height: 1,
               }} />
             </VrButton>
           </View>
         : null
        }
        {(this.state.page === '2')
         ? <View>
            {this.backButton()}
            <VrButton onClick={()=> this.move('3','3.jpg')}
               style={{
                 opacity: 0.5,
                 transform: [{translate: [-12.2, -2.7, -5.9]},
                             {rotateX: 0},
                             {rotateY: 60}]}}>
               <Image
                source={asset('up-arrow.png')}
                style={{width: 2.5,
                        height: 2.5}}/>
             </VrButton>
             <VrButton onClick={()=> this.bookseat()}
               style={{
                 transform: [{translate: [-8,3,-5.7]},
                             {rotateX: 0},
                             {rotateY: 110}]
               }}>
             <Image source={asset('4C.png')}
               style={{
                 width: 0.6,
                 height: 0.6,
               }} />
             </VrButton>
             <VrButton onClick={()=> this.bookseat()}
               style={{
                 transform: [{translate: [-8,3,15.5]},
                             {rotateX: 0},
                             {rotateY: 150}]
               }}>
             <Image source={asset('1A.png')}
               style={{
                 width: 2.2,
                 height: 2.2,
               }} />
             </VrButton>
           </View>
         : null
        }
        {(this.state.page === '3')
          ? <View>
              {this.backButton()}
              <VrButton onClick={()=> this.move('4','4.jpg')}
                 style={{
                   opacity: 0.5,
                   transform: [{translate: [-12.2, -2.7, -3.4]},
                               {rotateX: 0},
                               {rotateY: 60}]}}>
                 <Image
                  source={asset('up-arrow.png')}
                  style={{width: 2.5,
                          height: 2.5}}/>
               </VrButton>
               {(this.state.isSelect === false)
                ? <VrButton onClick={()=> this.bookseat()}
                     style={{
                       transform: [{translate: [-8,3.2,-5]},
                                   {rotateX: 0},
                                   {rotateY: 110}]
                     }}>
                   <Image source={asset('4C.png')}
                     style={{
                       width: 1.5,
                       height: 1.5,
                     }} />
                   </VrButton>
                 : <VrButton
                      style={{
                        transform: [{translate: [-8,3.2,-5]},
                                    {rotateX: 0},
                                    {rotateY: 110}]
                      }}>
                    <Image source={asset('AVAILABLE.png')}
                      style={{
                        width: 1.5,
                        height: 1.5,
                      }} />
                    </VrButton>
               }
               <VrButton onClick={()=> this.bookseat()}
                 style={{
                   transform: [{translate: [5.5,4,8.2]},
                               {rotateX: -15},
                               {rotateY: 180}]
                 }}>
               <Image source={asset('1A.png')}
                 style={{
                   width: 1,
                   height: 1,
                 }} />
               </VrButton>
             </View>
         : null
        }
      </View>
    );
  }
};

var styles = StyleSheet.create({
flights: {
  margin: 20,
},
descBox:{
  backgroundColor: 'black',
  width: 2.1,
  transform: [{translate: [3, 2,-2]},
              {rotateY: -55}]
},
descTitle:{
  color: 'white',
  fontSize: 0.4,
  fontWeight: 'bold',
  textAlign: 'center',
  textAlignVertical: 'center',
},
title: {
  fontSize: 19,
  fontWeight: 'bold',
},
activeTitle: {
  color: 'red',
},
});

AppRegistry.registerComponent('Horus', () => Horus);
