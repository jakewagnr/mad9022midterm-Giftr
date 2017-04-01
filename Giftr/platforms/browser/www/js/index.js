/*!
 * =====================================================
 * Ratchet v2.0.2 (http://goratchet.com)
 * Copyright 2014 Connor Sears
 * Licensed under MIT (https://github.com/twbs/ratchet/blob/master/LICENSE)
 *
 * v2.0.2 designed by @connors.
 * =====================================================
 */
/* ========================================================================
 * Ratchet: modals.js v2.0.2
 * http://goratchet.com/components#modals
 * ========================================================================
 * Copyright 2014 Connor Sears
 * Licensed under MIT (https://github.com/twbs/ratchet/blob/master/LICENSE)
 * ======================================================================== */


"use strict";
moment.locale('en-CA');
let giftStorage = {
    "people": []
};
let currentPerson = 0;

var app = {
    init: function () {
        //set up event listeners and default variable values
        console.log("confirm launch");
        window.addEventListener('push', app.pageChanged);
        app.pageChanged();
    }
    , pageChanged: function () {
        //user has clicked a link in the tab menu and new page loaded
        //check to see which page and then call the appropriate function
        console.log("page change");
        if (document.getElementById("page-birthdays")) {
            console.log("page-birthdays");
            eventListeners.removeIdeas();
            eventListeners.addPeople();
            people.draw();
        }
        else {
            console.log("page-gifts");
            eventListeners.removePeople;
            eventListeners.addIdeas();
            gifts.draw();
            document.getElementById("backBtn").addEventListener("touchend", function () {
                console.log(currentPerson);
                currentPerson = 0;
            });
        }
    }
}
var people = {
    draw: function () {
        if (!localStorage.getItem("giftr-wagn0070")) {
            localStorage.setItem("giftr-wagn0070", JSON.stringify(giftStorage));
            console.log(localStorage);
        }
        else {
            document.getElementById("list-birthdays").innerHTML = "";
            let savedPeople = JSON.parse(localStorage.getItem("giftr-wagn0070"));

            function compare(a, b) {
                if (a.dob.substring(5) < b.dob.substring(5)) return -1;
                if (a.dob.substring(5) > b.dob.substring(5)) return 1;
                return 0;
            }
            savedPeople.people.sort(compare);
            for (let i = 0; i < savedPeople.people.length; i++) {
                let li = document.createElement("li");
                let spanName = document.createElement("span");
                let aName = document.createElement("a");
                let aDOB = document.createElement("a");
                let spanDOB = document.createElement("span");
                console.log(savedPeople.people[i].name);
                li.classList.add("table-view-cell");
                spanName.classList.add("name");
                aName.setAttribute("href", "#personModal");
                aName.setAttribute("data-id", savedPeople.people[i].id);
                aName.textContent = savedPeople.people[i].name;
                aName.addEventListener("touchend", storage.editPeople);
                aDOB.classList.add("navigate-right", "pull-right");
                aDOB.setAttribute("href", "items.html");
                aDOB.setAttribute("data-id", savedPeople.people[i].id);
                aDOB.addEventListener("touchstart", current.current);
                spanDOB.classList.add("dob", "pull-right");
                var dateString = savedPeople.people[i].dob;;
                var momentObj = moment(dateString, 'YYYY-MM-DD');
                var momentString = momentObj.format("MMM Do");
                spanDOB.textContent = momentString;
                spanName.appendChild(aName);
                aDOB.appendChild(spanDOB);
                li.appendChild(spanName);
                li.appendChild(aDOB);
                document.getElementById("list-birthdays").appendChild(li);
            };
        }
    }
}
var gifts = {
    draw: function () {
        document.getElementById("list-ideas").innerHTML = "";
        if (!localStorage.getItem("giftr-wagn0070")) {
            localStorage.setItem("giftr-wagn0070", JSON.stringify(giftStorage));
            console.log(localStorage);
        }
        else {
            let stored = JSON.parse(localStorage.getItem("giftr-wagn0070"));
            console.log(currentPerson);
            for (let i = 0; i < stored.people.length; i++) {
                if (currentPerson == stored.people[i].id) {
                    console.log("match");
                    for (let c = 0; c < stored.people[i].ideas.length; c++) {
                        console.log(c);
                        let li = document.createElement("li");
                        let div = document.createElement("div");
                        let h3 = document.createElement("h3");
                        let p1 = document.createElement("p");
                        let p2 = document.createElement("p");
                        let a3 = document.createElement("a");
                        let a2 = document.createElement("a");
                        li.classList.add("table-view-cell", "media");
                        div.classList.add("media-body");
                        a2.setAttribute("data-id", stored.people[i].ideas[c].id);
                        a2.className = "icon icon-trash pull-right midline";
                        a2.addEventListener("touchstart", storage.deleteGift);
                        h3.textContent = stored.people[i].ideas[c].idea;
                        p1.textContent = stored.people[i].ideas[c].at;
                        p2.textContent = stored.people[i].ideas[c].cost;
                        a3.textContent = stored.people[i].ideas[c].url;
                        a3.href = stored.people[i].ideas[c].url;
                        div.appendChild(h3);
                        div.appendChild(p1);
                        div.appendChild(p2);
                        if (stored.people[i].ideas[c].url.length > 7) {
                            div.appendChild(a3);
                        };
                        div.appendChild(a2);
                        li.appendChild(div);
                        document.getElementById("list-ideas").appendChild(li);
                    };
                }
            }
        };
    }
}
var storage = {
    savePerson: function () {
        let stored = JSON.parse(localStorage.getItem("giftr-wagn0070"));
        console.log(currentPerson);
        if (currentPerson == 0) {
            let person = {
                "id": Date.now()
                , "name": document.getElementById("name").value
                , "dob": document.getElementById("birthday").value
                , "ideas": []
            };
            stored.people.push(person);
            stored = JSON.stringify(stored);
            console.log(stored);
            localStorage.setItem("giftr-wagn0070", stored);
            document.getElementById("name").value = "";
            document.getElementById("birthday").value = "";
            document.getElementById("reset").reset();
        }
        else {
            for (let i = 0; i < stored.people.length; i++) {
                if (currentPerson == stored.people[i].id) {
                    console.log(stored.people[i].id);
                    stored.people[i].name = document.getElementById("name").value;
                    stored.people[i].dob = document.getElementById("birthday").value;
                    currentPerson = 0;
                }
            }
            stored = JSON.stringify(stored);
            localStorage.setItem("giftr-wagn0070", stored);
        }
        people.draw();
        storage.cancelPerson();
    }
    , saveGift: function () {
        let stored = JSON.parse(localStorage.getItem("giftr-wagn0070"));
        console.log(stored.people.length); //3
        stored.people.forEach(function (person, index) {
            if (currentPerson == person.id) {
                console.log("here");
                let idea = {
                    "id": Date.now()
                    , "idea": document.getElementById("item").value
                    , "at": document.getElementById("location").value
                    , "cost": document.getElementById("price").value
                    , "url": document.getElementById("link").value
                }
                stored.people[index].ideas.push(idea);
                stored = JSON.stringify(stored);
                localStorage.setItem("giftr-wagn0070", stored)
            }
        })
        gifts.draw();
        storage.cancelGift();
    }
    , editPeople: function (ev) {
        let stored = JSON.parse(localStorage.getItem("giftr-wagn0070"));
        let pos = ev.currentTarget.getAttribute("data-id");
        console.log(pos);
        let indexOut = 0;
        for (let i = 0; i < stored.people.length; i++) {
            console.log(stored.people[i].id);
            if (pos == stored.people[i].id) {
                console.log(i);
                indexOut = i;
                break;
            }
        }
        document.getElementById("name").value = stored.people[indexOut].name;
        document.getElementById("birthday").value = stored.people[indexOut].dob;
        currentPerson = pos;
        stored = JSON.stringify(stored);
        console.log(stored);
        localStorage.setItem("giftr-wagn0070", stored);
        // currentPerson = 0;
    }
    , deletePerson: function (ev) {
        console.log("here");
        let stored = JSON.parse(localStorage.getItem("giftr-wagn0070"));
        let indexOut = 0;
        for (let i = 0; i < stored.people.length; i++) {
            console.log(currentPerson);
            if (stored.people[i].id == currentPerson) {
                console.log(i);
                console.log(stored.people);
                stored.people.splice(i, 1);
            }
        }
        stored = JSON.stringify(stored);
        console.log(stored);
        localStorage.setItem("giftr-wagn0070", stored);
        document.getElementById("name").value = "";
        document.getElementById("birthday").value = "";
        people.draw();
        //  currentPerson = 0;
    }
    , deleteGift: function (ev) {
        let stored = JSON.parse(localStorage.getItem("giftr-wagn0070"));
        stored.people.forEach(function (person, index) {
            if (currentPerson == person.id) {
                person.ideas.forEach(function (gift, idex) {
                    if (gift.id == ev.currentTarget.getAttribute("data-id")) {
                        stored.people[index].ideas.splice(idex, 1);
                    }
                });
                stored = JSON.stringify(stored);
                console.log(stored);
                localStorage.setItem("giftr-wagn0070", stored);
            }
        });
        gifts.draw();
    }
    , cancelPerson: function () {
        document.getElementById("name").value = "";
        document.getElementById("birthday").value = "";
        document.getElementById("reset").reset();
        currentPerson = 0;
    }
    , cancelGift: function () {
        document.getElementById("item").value = "";
        document.getElementById("location").value = "";
        document.getElementById("price").value = "";
        document.getElementById("link").value = "http://";
        // currentPerson = 0;
    }
}
var eventListeners = {
    addPeople: function () {
        console.log("eventListeners added");
        document.getElementById("cancelBtn").addEventListener("touchend", storage.cancelPerson);
        document.getElementById("saveBtn").addEventListener("touchend", storage.savePerson);
        document.getElementById("deleteBtn").addEventListener("touchend", storage.deletePerson);
        document.getElementById("modalClose").addEventListener("touchend", storage.cancelPerson);
    }
    , removePeople: function () {
        console.log("eventListeners removed");
        document.getElementById("cancelBtn").removeEventListener("touchend", storage.cancelPerson);
        document.getElementById("saveBtn").removeEventListener("touchend", storage.savePerson);
        document.getElementById("deleteBtn").removeEventListener("touchend", storage.deletePerson);
        document.getElementById("modalClose").removeEventListener("touchend", storage.cancelPerson);
    }
    , addIdeas: function () {
        console.log("eventListeners added");
        document.getElementById("cancelBtn").addEventListener("touchend", storage.cancelGift);
        document.getElementById("saveBtn").addEventListener("touchend", storage.saveGift);
        document.getElementById("deleteBtn").addEventListener("touchend", storage.deleteGift);
        document.getElementById("modalClose").addEventListener("touchend", storage.cancelGift);
    }
    , removeIdeas: function () {
        console.log("eventListeners removed");
        document.getElementById("cancelBtn").removeEventListener("touchend", storage.cancelGift);
        document.getElementById("saveBtn").removeEventListener("touchend", storage.saveGift);
        document.getElementById("deleteBtn").removeEventListener("touchend", storage.deleteGift);
        document.getElementById("modalClose").removeEventListener("touchend", storage.cancelGift);
    }
}
var current = {
    current: function (ev) {
        let x = ev.currentTarget;
        currentPerson = x.getAttribute("data-id");
    }
}

document.addEventListener("deviceready", app.init);