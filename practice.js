

const bookings = [
  { name: 'Ali', service: 'haircut' , status :'pending'},
  { name: 'John', service: 'coloring' , status :'confirmed'},
  { name: 'Sara', service: 'massage' , status :'pending'},
]

//console.log(bookings[1].name)

//function showBooking(booking){
//    console.log("Customer : ",booking.name)
//    console.log("service : ",booking.service)
//}
//showBooking(bookings[0])

//function showBooking(bookings){    
//console.log("customer: ",bookings.name)   
//console.log("Services: ",bookings.service) 
//}

//for (let i=0 ; i < bookings.length ; i++ ){
  //  showBooking(bookings[i])
//}


const showBooking = (x)=>{

    console.log("customer: ",x.name)   
    console.log("Services: ",x.service) 
}
showBooking(bookings[0])

const test = ()=>{
    console.log ("heloo")
}

test()

const result = bookings.filter((x)=>{
    return x.status ==="pending"
})
console.log(result)

const fi= bookings.find((x)=> x.status==="pending")

console.log("find=",fi)

const john= bookings.find((x)=> x.name==="John")

console.log("name = ",john)

const name = bookings.map((x)=>{
    return x.name
})

console.log(name)

for ( let i =0 ; i< bookings.length ; i++ ){

    const x = bookings[i]
    
    if (x.status === "pending"){
        console.log(x.name ," : is pending")
    }else{
        
        console.log(x.name," :is approved")
    }
}
///////////////////////

function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

async function showMessage() {
    console.log("شروع...")
    await wait(2000)        // 2 ثانیه صبر کن
    console.log("تموم شد!")
}

showMessage()


async function getBooking() {
    try{

        console.log("Getting booking....")
        await wait(1000)
        console.log("Booking found",bookings[10]) 
    }catch(error){
        console.log(" Error: ",error) 
    }
    
    
}

getBooking()

async function getbooking2(params) {

    try {

        console.log("Getting booking....")
        await wait (1000)

        const booking = bookings[1]

        if (!booking){
            throw new Error ("Booking not found...")
        }

        console.log("Booking Found ", booking.name)
        
    } catch (error) {
        console.log("Error:", error.message)
    }
    
}
getbooking2()