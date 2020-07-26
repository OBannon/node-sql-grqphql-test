const users = [
    {name: "Igor", age: 30, email: "igor@mail.com"},
    {name: "Elena", age: 23, email: "elena@mail.com"}
]


module.exports = {
    test(){
        return {
            count: Math.trunc(Math.random() * 10),
            users
        }
    },
    random({min, max, count}){
        const arr = []
        for(let i = 0; i < count; i++){
            const random = Math.random()*(max - min) + min
            arr.push(random)
        }
        return arr;
    }
}