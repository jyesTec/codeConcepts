//- Queue___the data structure which follows FIFO, where the elements are added to the end and removed from the begining.
// it includes the methods to
    // -> Add elements
    // -> Remove elements
    // -> peek at front element
    // -> check if queue is empty
    // -> Gets the size of the queue
    // -> print the queue elements.


class Queue{
    constructor(){
        this.queue = []
    }

    enqueue(data){
        this.queue.push(data)
    }

    dequeue(){
        // Checks if queue is Empty //> EdgeCase
        if(this.isEmpty()){
            return "The queue is Empty"
        }
        return this.queue.shift()   //= removes the first element from an array and returns it, simultaneously shifts the elements. here the array is not modified.
    }

    isEmpty(){
        return this.queue.length === 0
    }

    peek(){
        return this.queue[0]    // gets the first element of an array
    }

    size(){
        return this.queue.length
    }

    printQueue(){
        let str = ''
        for (let i = 0; i < this.queue.length; i++) {
            str += this.queue[i];
        }
        return str;
    }

}


// usage
let myQueue = new Queue()
myQueue.enqueue(78)
myQueue.enqueue(78)
myQueue.enqueue(78)
myQueue.enqueue(78)
myQueue.enqueue(78)
myQueue.dequeue()

console.log(myQueue.printQueue());  // takes the refrence of the constructor


