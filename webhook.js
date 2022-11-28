const {EmbedBuilder, WebhookClient} = require('discord.js');
const webhookClient = new WebhookClient({ url: 'https://discord.com/api/webhooks/1046563062284550295/YtmptDBj3oX7cGMxuD_pxdpfEidv4VOKdtd3Tzefqc4jIXu8qGWn86PsbyBkBvfPzKJq' });



  
webhookClient.send({
    "embeds": [
        {
          "author": {
            "name": "NUM",

            "icon_url": "https://i.pinimg.com/736x/de/7e/06/de7e06f1642d2b9e8b870e0beb77ad6e.jpg"
          },
          "title": "Welcome to the NUM Discord Server",
          "description": "Glad you joined! In the server we only take part in chill vibes and socialise with each other just playing games and writing code and stuff. \n \n There are no specific rules, but please be respectful to others in the community and just enjoy your time.",
          "color": 2422219, 
          "fields": [
            {
              "name": "Website",
              "value": "[Coleridge.dev](https://www.coleridge.dev)",
            },
            {
              "name": "Twitter",
              "value": "[@kaicoleridge](https://twitter.com/kaicoleridge)",
            },
            {
                "name": "Github",
                "value": "[@kaicoleridge](https://github.com/kaicoleridge)",
              },
              {
                "name": "Instagram",
                "value": "[@kaicoleridge](https://instagram.com/kaicoleridge)",
              },
           
          ],
         
          "footer": {
            "text": "Developed by NUM#3806",
          }
        }
      ]
    }
);