var expect = require('expect');
var {generateMessage,generateLocationMessage} = require('./message');



describe('generateMessage',()=>{

    it('should generate correct message object',()=>{
        var message = {
            from: 'Laci',
            text:'This should work'
        };
        var res  =generateMessage(message.from,message.text);
        expect(res).toBeA('object').toInclude({
            from:message.from,
            text:message.text,
            
        });
        expect(res.createdAt).toBeA('number');
       
    });
});

describe('generateLocationMessage',()=>{
    it('should generate correct location',()=>{
        var message = {
            from: 'Laci',
            lat:14,
            long:15
        };
        var res  =generateLocationMessage(message.from,message.lat,message.long);
        expect(res).toBeA('object').toInclude({
            from:message.from,
            url:`https://www.google.com/maps?q=${message.lat},${message.long}`          
        });
        expect(res.createdAt).toBeA('number');
    });
});