//- Stack___is the type of dataStructure which acts same like Array where the addition or removal of elements are governed by us.
//- This has an approach of LIFO.


class Stack{
    constructor(){
        this.stack = [];
    }

    push(data){
        this.stack.push(data)   //= Appends new elements to the end of an array and returns the new Length of an array.
    }
    pop(){
        this.stack.pop() //= Removes the lastEle from an Array and returns it. Doesn't make any modification in the existing Array.
    }

    peek(){
        return this.stack[this.stack.length - 1]    //= gets the top element of an array.
    }

    isEmpty(){
        return this.stack.length === 0  //= checks if the array is empty
    }

    size(){
        return this. stack.length
    }

    clear(){        
        return this.stack = []
    }

    contains(ele){
        return this.stack.includes(ele)
    }

    reverse(){
        return this.stack.reverse()
    }

    printStack(){
        let str = "";
        for (let i = 0; i < this.stack.length; i++) {
            str += this.stack[i];
            return str
        }
    }

}

// usage

let myStack = new Stack()
myStack.push(4);
myStack.push(3);
myStack.push(2);
myStack.push(1);
console.log(myStack.printStack());
