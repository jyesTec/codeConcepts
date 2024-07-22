## Pro
1. EventLoop
    - As we know JS is single threaded,still the UI never stucks
    - which means when a program is loaded on webBrowser / runtime js executes line by line, yet can handle multiple operations simultaneously where it behaves asynchrously enabling the  nonBlocking behaviour.
    - Ex.: 
    ```javascript
        const one = ()=>console.log('First');
        const two = ()=> setTimeout(()=>console.log('Second'), 1000);
        const three = ()=> console.log('Third');

        two();
        one();
        three();
    ```
![EventLoopArchitecture](codeConcepts/01_Javascript/assets/eventLoopArchitecture.png)
    - The main key components are 
        - callStack, follows LIFO
        - Heap, where memory is allocated dynamically. Ex Objects, arrays etc..
        - Queue, (TaskQueue) where async tasks waits to get executed. setTimeout, I/O operations etc..
        - EventLoop
        So what happens is, the order of execution is imp.. Let's see the journey of the event loop execution.
            -  the 1st line having <code>console.log('First)</code> is pushed to callstack and executed and logs
            - setTimeout, is 1st moved to the callstack, then moved to BrowserAPI. Here, from BrowserAPI it again being pushed to the microTaskQueue which is kept ready to be executed after a specified delay.
            - console.log('Third); is pushed to the callstack, executed and logs 'Third'
            - Here, once the callstack is empty The eventLoop checks the microtask queue finds the setTimeout() callback and executes logging "Second".

2. hoisting & TemporalDeadZone
    - where JSEngine, just memory loading phase before the execution (It does not executes any code there), where the every line of code is being scanned before the actual execution.
    - While loading if it gets across the 
        - function, it stores the refrence/definition of the function.
        - let/const, keeps the variables <strong>uninitalized</strong>
        - var, undefined

    - Ex.: If we try to access the 
        - Function before declaration, We dont get any issue or error as the refrence of the function is already being loaded, we can execute the function at any place at ant time.
        - Let/const before declaration, we get RefrenceError ()
        - var before declaration, we gets undefined

    - TEMPORAL DEAD ZONE : generally seen in let& const, 
        - it is the phase b/w entering into the scope and being declared where they cannot be accessed.
        - let & const are block-scoped, which means they are only accessible within the {}

3. Scope & ScopeChain
    - accessiblity range of the variable,
        - Global Scope
            - Browser => window()
            - node => global => {}
        - Block Scope, functional scope => function(){}.
        - Local Scope
    - scopeChain, chain of refrences.
        - where JS continuously hunts for the variable from LocalExecutionContext (LocalScope) till it reaches the GlobalExecutionContext.
        - This is always one way, 
            - where only insider can go outside. Vice-versa is not possible.

4. Prototypal Inheritance and chaining.
    - where we take something and extend it.
    - linking of prototypes of a parent object to the child object to share and utilize its properties and methods of the parent class.
        - Ex.: .join, .length
        - prototypalInheritance, can be borrowed on String, Array, Objects
    - Single prototype, can inherit only 1class.
    - Multiple Inheritance, __proto__.__proto__
        - Object.create()
        - Object.getProtypeOf
        - Object.setPrototypeOf
    
    ```javascript
    // Before ES6
        let faang = {
            name:'google',
            salary:function()=>{
                console.log('30K salary')
            }
        }
        let engineer = {
            empId=123,
            task:function(){
                console.log('task assigned');
            }
        }
        engineer.__proto__=faang;   // engineer inherits all the properties of faang
        console.log(engineer);
        engineer.salary()


    // After ES6
        let faang={
            name:"google",
            salary:function(){
                console.log("40K salary");
            }
        }
        let engineer = Object.create(faang, {
            taskAssigned:{value:2}
        })
        console.log(engineer)
    ```
    - PropertyShadowing
        - name:"chai",
        __proto__:{name:"tea"}  // bk.name="chai"
        __proto__: {__proto__:type:"ginger"}    // bk.type = 'ginger'

        - shadowing, where a variable is declared within a nested scope and has the same name as variable in its outer scope.
            - while getting the values it takes the available nearest value.

    - MonkeyPatching
        - Do not add the customFunction name directly in the Array,String or    Object
        - Ex.: Array.prototype.customlength()
        - Becoz if somewhere down the line while writing the ES9 or ES10. If    they use the same as yours then there would be condition of overwrite.     Thus, your library/App may break.


5. Promises and Queues
    - Promise, is a placeholder which represents the resolve or reject of an async Operation.
    ```javascript
        console.log(new Promise(()=>{}))
        // Returns below response,
            [[Prototype]]:Promise
            [[PromiseState]]:"pending"    // default State of promise
            [[PromiseResult]]:undefined   // default State of result
    ```
    - it always responds back with
        - State & Result
        - State is of 3 types
            - Pending
            - Rejected
            - fulfilled
    - this takes a callback function having 2 args : res, rej
        ```javascript
        new Promise((res,rej)=>{
            console.log(res)    // response, if success.
            console.log(rej)   // rejection
        })
        ```
    > NOTE: new Promise(()=>{}), is a synchrous function till, we add .then(). So, async function will be as follows 
        >> new Promise(()=>{}).then()

    - If we get the data from API
    ```javascript
        getDataFromAPI(url)
        .then(data => console.log(data))
        .catch(error => console.log(error))
        .finally(()=> console.log("All done---"))
    ```
    > We can always further chain of .then(), till we get the finally result.
    - Promise adds ansynchrous behaviour to js, by using .then() or .catch()

    - Methods, which directly goes to microtask queue or macroTask Queue
        - MacroTask (Timer Operations, FileRead, HTTP task..)
            - setTimeout
            - setInterval
            - setImmediate
            - I/O Operation
            - UI rendering
            - HTTP request

        - MicroTask (Have more Priority)
            - Promise handlers, .then(), .catch(), .finally()
            - queue Microtask()
            - Mutation Observer

    > If we tryto access the Http handlers or timeout operations in Promise, then it behaves as microTask queue.

    > callStack &&  microTask == empty, then it should execute the task queue.
    ```javascript
        console.log("Start!..")         // starts
        setTimeout(()=>{                // TimerMethod, goes to MacroTask Queue
            console.log('Timeout')
            }, 0)
        Promise.resolve('Promise!..')
            .then((res)=>{console.log(res)})    // MicroTask Queue
        console.log("End!..")           // Ends--
    ```
    <!-- Response Of Above Code is Start, End, Promise, TimeOut -->
        
6. Async / Await
    - Promise.resolve('chai') == async function tea(){ return "chai"}   // yes, this is equal. If looking for await in async, it is equal to .then() in promise.

    - await => makes the async function to wait in awaitedState till it returns the resolved promise.
    > After await, the rest of the async function gets moved to the microtask queue.
    // Practice
    ```javascript
        const one = ()=>Promise.resolve("one")      // synchronous code

        async function test(){                      // Async function
            console.log("Inside Test Function----")     
            const result = await one();
            console.log(result)             // resolves and stores the value in result, As console.log() is after await. So, the result would wait in the microtask queue
        }
        console.log("Before calling Test function-------")
        test();
        console.log("After calling test function-----")
    ```
    <!-- Before calling the Test function ---,  Inside Test Function---, After calling the function---,   Now prints the result=> "one"-->

    ```javascript
        console.log("Script Start---")      //"1-----Starts"

        setTimeout(()=>{                        // Moves to MacroTask Queue
            console.log('setTimeout---')            // 8----
        }, 0 )

        new Promise((resolve, reject){              // Syncronous Code
            console.log("Promise Constructor--");   // 2---
            resolve("Promise Resolved")                 // 6-----
        }).then((res)=>{
            console.log(res)                        // MicroTask Queue
        })

        async function asyncFunc(){
            console.log("asyncFunc starts--")       // 3----
            await new Promise((resolve)=>{          // 
                console.log("Promise inside AsyncFunc") // 4--
                resolve("async/await resolved----")         // 7-----
            })
            console.log("AsyncFunc Ends---")        // await, soo MicroTask Queue
        }

        asyncFunc();

        console.log('Script Ends---')               //5---
    ```

7. Closure
    - closure, the combination of a function which is being bundled together with the refrences to its surrounding state.
    - A closure gives access to the outer function's scope from an inner function.
    - closure is created everytime a function is created, i.e function creation time.
    ```javascript
        function outer(x){
            return function inner(y){
                return x+y  // If the outerFunction is not refrenced, It is Garbage collected. Here it is refrenced so we can use its lexicalEnv Details.
            }
        }
        const result = outer(2)
        result(5)
    ```
    > NOTE: Inner Lexical Enviornment refers to the outer lexical enviornment. When the outer Lexical function is not refrenced, it is Garbage collected.

    <!-- Practice -->
    ```javascript
        const getValue = ()=>{
        let score = 10;
        return () => ++score;   // performs the operation before returning 
        }
        const value = getValue();
        <!-- ! IMP -->
        console.log(value)  // stores the refrence of the return Function. Here, its does not use the previous value to perform the next operation. Rather, this copy whole of the function to other place performs the operation and returns the value.
        console.log(value())    // 11
        console.log(value())    // 12
    ```
    ```javascript
        const getValue = ()=>{
        let score = 10;
        return () => score++;   // performs the operation after return, so at first it returns the initial value before increasing.
        }
        const value = getValue();
        <!-- ! IMP -->
        console.log(value)  // stores the refrence of the return Function. Here, its does not use the previous value to perform the next operation. Rather, this copy whole of the function to other place performs the operation and returns the value.
        console.log(value())    // 10
        console.log(value())    // 11
    ```
    ```javascript
        function loadBalance(){
            let userBalance = 100;
            function addBalance(){
                let newValue = ++userBalance;
                return newValue;
            }
            return {addBalance};    // returns the full functional method of addBalance.
        }
        const balance = loadBalance();  // returns the reference of the function.
        console.log(balance.addBalance());  //101
        console.log(balance.addBalance());  // 102
        console.log(loadBalance().addBalance()) // 101
    ```

8. THIS
    - provides the context of the function.
    - Its is generally based on which enviornment
        - Browser
            - it points to the window object,

        - Runtime such as Node, Bun, Deno etc..
            - It points to the global Object, generaly {}.

    - Regular Fn with this (IN BROWSER)
        ```javascript
            function getThis(){
                console.log(this)
            }
            const obj = {
                getThis
            }
            getThis();  // gets WindowObject
            obj.getThis()   // refrence of the function.
        ```
    - Arrow Function in Browser
        ```javascript
            const getThis = () =>{
                console.log(this)
            }
            const obj = {
                getThis
            }
            getThis();  // gets WindowObject
            obj.getThis()   // gets WindowObject
        ```
    ARROW Fn Vs REGULAR Fn in DOM
    ```javascript
        <!-- Regular Function -->
            button.addEventListner('click', function(){
                console.log(this)
            })
            button.click()  // whoever calls the this, have its own refrence. So, here it get the full refrence of button. <button>ClickMe</button>

        <!-- Arrow Function -->
            buttonTwo.addEventListner('click', ()=>{
                console.log(this)   
            })
            buttonTwo.click()   // in ArrowFunction, this function gets the global Object Window..
        ```
9.  Call, Apply and Bind
    - call
        - immediately invokes a function with the specified "this"(getting from the function)
    - Apply
        - same as call but args are passed as an array.
    - Bind
        - returns a new function, when called has its own "this" value set to the provided value.
    ```javascript
        const person = {
            name:"Alice",
            age:25
        };
        function introduce(interest, hobby){
            console.log(`My name is ${this.name} and iam ${this.age} years old. I like ${interest} and ${hobby}`)
        }
        introduce.call(person, "math", "chess") // person is the context provided.
        <!-- Context can be any object, which cannot be called directly. We have to use call() -->

        introduce.apply(person,["science", "Badminton"])    // same as call, context has been provided and the args have been passed in the array.

        const boundIntroduce = introduce.bind(person, "literature");   // takes the copy of the original function. Here it passes the context and 1arg has been passed.
        boundIntroduce("writing")   // here, again it the 2nd args has been passed.
    ```







