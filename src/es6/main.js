import {query, User} from './components/user';

import $ from 'jquery';


let user = new User();
user.showInfo('test');
//
query('query data');

$(document).ready(function () {
    //

    $('#tests').click(function(){
        //
        alert('hehe');
    });
});

