// Storage Controller
// TODO



// Item Controller
const itemCtrl = (function(){
    
    // constructor
    const itemCtrl = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    // Structure of data
    const data = {
        items: [],
        currentItem: null,
        totalCalories: 0
    }


    return {
        getItems: function(){
            return data.items
        },

        setCalories: function(calories){
            data.calories = calories
        },

        setCurrentItem: function(item){
            data.currentItem = item;
        },

        getCurrentItem: function(){
            return data.currentItem;
        },

        clearCurrentItem: function(){
            data.currentItem = null;
        },

        editData: function(name, calories){
            let edited = null;
            
            calories = parseInt(calories);

            data.items.forEach( item => {
                if(item.id  === data.currentItem.id){
                    item.name = name;
                    item.calories = calories;
                    
                    edited = item;
                }
            })
            return edited;



        },

        deleteitem: function(id){
           
            const ids = data.items.map(item => {
                return item.id
            })

            const idData = ids.indexOf(id);

            data.items.splice(idData,1);

        },

        logdata: function(){
            return data
        },

        addItem: function(name, calories){
            let ID;
            if(data.items.length > 0){
                ID = data.items.length;
            }else{
                ID = 0;
            }

            item = new itemCtrl(ID,name,calories);
            data.items.push(item);

            return item;
        },
        
        findItemObject: function(id){
            let found = null;

            data.items.forEach(function(item) {
                if(item.id === id){
                    found = item;
                }
            })

            return found;
        },

        clearAllData: function(){
            data.items.splice(0,data.items.length)
        }
    }




})()

// UI Controller
const uiCtrl = (function(){
    const UIElements = {
        collection: '.collection',
        totalCalories: '.total-calories',
        list: '.collection-item',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        addMeal: '#addmeal',
        addCalories: '#addcalories',
        clearButton: '.clear-btn'
    }
    return{
        initializeList: function(items){
            let html = '';

            items.forEach(item => {
                html +=`
                <li class="collection-item" id="item-${item.id}">
                    <strong>${item.name}: </strong> <em>${item.calories}kcal</em>
                    <a href="" class="secondary-content"><i class="fa fa-pencil"></i></a>
                </li>`    
            });
            document.querySelector(UIElements.collection).innerHTML = html;
        },

        initializeCalories: function(items){
            let calc = 0;

            items.forEach(item => {
                calc += parseInt(item.calories);
            })
            itemCtrl.setCalories(calc);
            document.querySelector(UIElements.totalCalories).textContent = calc;

        },

        getUIElements: function(){
            return UIElements;
        },

        getInputValue: function(){
            return{
                name: document.querySelector(UIElements.addMeal).value,
                calories: document.querySelector(UIElements.addCalories).value
            }
        },

        getEditState:function(){
            uiCtrl.clearInput();
            document.querySelector(UIElements.addBtn).style = 'display: none';
            document.querySelector(UIElements.updateBtn).style = 'display: inline';
            document.querySelector(UIElements.deleteBtn).style = 'display: inline';
            document.querySelector(UIElements.backBtn).style = 'display: inline';
        },

        normalState:function(){
            uiCtrl.clearInput()
            document.querySelector(UIElements.addBtn).style = 'display: "inline"';
            document.querySelector(UIElements.updateBtn).style = 'display: none';
            document.querySelector(UIElements.deleteBtn).style = 'display: none';
            document.querySelector(UIElements.backBtn).style = 'display: none';
        },

        addDataToInput: function(object){
            document.querySelector(UIElements.addMeal).value = object.name;
            document.querySelector(UIElements.addCalories).value = object.calories;
        },

        clearInput: function(){
            document.querySelector(UIElements.addMeal).value = '';
            document.querySelector(UIElements.addCalories).value = '';
        },

        editInput: function(id, name, calories){
            const list = Array.from(document.querySelectorAll(UIElements.list));
            const idFromInput = `item-${id}`;
            
            list.forEach(item => {
                if(item.id === idFromInput){
                    document.querySelector(`#${item.id}`).innerHTML = `
                    <strong>${name}: </strong> <em>${calories}kcal</em>
                    <a href="" class="secondary-content"><i class="fa fa-pencil"></i></a>`
                }
                
            });

            uiCtrl.normalState();

        },

        deleteItem: function(id){
            nodeID = `#item-${id}`

            const element = document.querySelector(nodeID);

            element.remove();
            uiCtrl.clearInput();
            uiCtrl.normalState();

        },

        clearAllData: function(){
            const allID = Array.from(document.querySelectorAll(UIElements.list));

            allID.forEach( item => {
                item.remove()
            })
        },

        updateList: function(id,name,calories){
            const li = document.createElement('li');
            li.className = 'collection-item';
            li.id = `item-${id}`;
            li.innerHTML = `
            <strong>${name}: </strong> <em>${calories}kcal</em>
            <a href="" class="secondary-content"><i class="fa fa-pencil"></i></a>`

            document.querySelector(UIElements.collection).appendChild(li);

        }


    }
})()

// App Controller
const app = (function(uiCtrl, itemCtrl){

    const loadEventListeners = function(){
        document.querySelector(uiCtrl.getUIElements().addBtn).addEventListener('click', addInput);
        document.querySelector(uiCtrl.getUIElements().collection).addEventListener('click', editState);
        document.querySelector(uiCtrl.getUIElements().backBtn).addEventListener('click', backButton);
        document.querySelector(uiCtrl.getUIElements().deleteBtn).addEventListener('click', deleteData);
        document.querySelector(uiCtrl.getUIElements().updateBtn).addEventListener('click', updateData);
        document.querySelector(uiCtrl.getUIElements().clearButton).addEventListener('click', clearData);


    }

    const addInput = function(e){
        const input = uiCtrl.getInputValue();

        if(input.name !== '' && input.calories !== ''){
            const item = itemCtrl.addItem(input.name, input.calories);
            uiCtrl.updateList(item.id,item.name,item.calories);
            uiCtrl.clearInput();

            // calculate calories
            const items = itemCtrl.getItems();
            uiCtrl.initializeCalories(items)

        }else{
            alert('Check your data')
        }
        
        
        e.preventDefault();
    }

    const editState = function(e){
        if(e.target.classList.contains('fa')){
            uiCtrl.getEditState();

            const currentItem = e.target.parentNode.parentNode;
            const currentItemID = currentItem.id;
            const arrID = currentItemID.split('-');
            const dataID = parseInt(arrID[1]);
            const itemObject = itemCtrl.findItemObject(dataID);

            itemCtrl.setCurrentItem(itemObject);

            uiCtrl.addDataToInput(itemObject);  
            
        }

        e.preventDefault()
    }

    const deleteData = function(e){

        const currentItem = itemCtrl.getCurrentItem();

        itemCtrl.deleteitem(currentItem.id);

        uiCtrl.deleteItem(currentItem.id);
        
        const items = itemCtrl.getItems();
        uiCtrl.initializeCalories(items);

        e.preventDefault();
    }

    const updateData = function(e){
        const inputValue = uiCtrl.getInputValue();

        const editData = itemCtrl.editData(inputValue.name, inputValue.calories);
        uiCtrl.editInput(editData.id, editData.name, editData.calories);

        const items = itemCtrl.getItems();
        uiCtrl.initializeCalories(items);

        e.preventDefault()
    }

    const backButton = function(e){
        uiCtrl.normalState();
        itemCtrl.clearCurrentItem();

        e.preventDefault()
    }

    const clearData = function(e){
        itemCtrl.clearAllData();
        uiCtrl.clearAllData();

        const items = itemCtrl.getItems();
        uiCtrl.initializeCalories(items);

        e.preventDefault()
        
        

    }

    return{
        init: function(){

            const items = itemCtrl.getItems();
            uiCtrl.initializeList(items);
            loadEventListeners();
            uiCtrl.initializeCalories(items)
            uiCtrl.normalState()

        }
    }

})(uiCtrl, itemCtrl);

app.init()

