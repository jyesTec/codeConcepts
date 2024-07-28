//- LinkedList___type of dataStructure which consists of a sequence of elements, which contains a refrence to the next element in the sequence.


class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

class LinkedList {  
    constructor() {
        this.head = null
    }
}

//. insert in the begning
LinkedList.prototype.insertAtBegning = function(data){
    const newNode = new Node(data)
    this.head = newNode
}

// ?> insert at the end
LinkedList.prototype.insertAtEnd = function(data){
    const newNode = new Node(data)
    // this.head == null    // : false
    if(!this.head){      //:> reversed just to enter into the codeBlock
        this.head = newNode;
        return;
    }
    let last = this.head;
    // last.next == null     // : true

    while(last.next){   // while([4,next])      //:> if false, it wont go inside the loop.
        last = last.next
    }
    last.next = newNode;    //:> moves to the next step
}


// ---------------------------------------------------------------------------

// ?> insert at given node
LinkedList.prototype.insertAfter = function(previousNode, data){
    if(!previousNode){
        console.log("The prevNode can't be null");
        return
    }
    const newNode = new Node(data, previousNode.next)
    previousNode.next = newNode
}

// ---------------------------------------------------------------------------

//?> Delete first & last node
LinkedList.prototype.deleteFirstNode = function(){
    if(!this.head){     //<<>>EdgeCase
        return
    }else{
        this.head = this.head.next  //:> unLinking the 1st node to move the Ref of the HEAD node to the nextNode
    }
}

// ?> Delete lastNode
deletelastNode = function(){
    if(!this.head){
        return  //:> If head is null || doesn't have any value to delete. 
    }
    if(!this.head.next){
        this.head = null    //:> if there is only oneNode
        return
    }
    let secondLast = this.head
    while(secondLast.next.next){
        secondLast = secondLast.next
    }
    secondLast.next = null

}


// --------------------------------------------------------------------------------------------------

//?> Delete a Node with a given key
deleteByKey = function(key){
    // If List is empty
    if(!this.head){
        console.log("List is empty---");
        return
    }
    //  if list is having only 1Node OR data is found at head
    if(this.head.data === key){
        this.head = this.head.next
        return
    }
    // traversing though the list of nodes
    let currVal = this.head;
    while(currVal.next !== null){
        if(currVal.next.data === key){
            currVal.next = currVal.next.next
            return;
        }
        currVal = currVal.next
    }
    console.log("No node found with the key---");
}

// ?> Search Operation
searchWithkey = function(key){
let currVal = this.head
while (currVal) {
    if(currVal.data === key){
        return true
    }
}
return false
}

// ?> traversal
LinkedList.prototype.traverseList = function(){
    let currVal = this.head;
    let listVal = []
    while(currVal){
        listVal.push(currVal.data)  //:> adds data to the list
        currVal = currVal.next  //:> moves to next node
    }
    console.log(listVal.join('->'));    //:> join, Adds all the values of a list in string format.
}

//?> Reverse a linkedList
reverseList = function(){
    let currVal = head;
    let prevVal , nextVal = null;

    while (currVal) {
        nextVal = currVal.next
        currVal.next = prevVal
        prevVal = currVal
        currVal = nextVal
    }
    this.head = prevVal
}







