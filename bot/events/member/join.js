const { Events, AttachmentBuilder, EmbedBuilder } = require('discord.js');
const { createCanvas, loadImage, registerFont } = require('canvas');
const chalk = require('chalk');
registerFont('./assets/fonts/impact.ttf', { family: 'Impact' });
registerFont('./assets/fonts/crowden.ttf', { family: 'Crowden' });

module.exports = {
  name: Events.GuildMemberAdd,
  once: false,
  async execute(Anya, member) {

    const channel = member.guild.channels.cache.get("1089976344504434689")
    if (member.user.bot || member.user.system) return
    const canvas = createCanvas(1400, 514);
    const ctx = canvas.getContext('2d');
    const backgroundImage =
      'https://cdn.discordapp.com/attachments/1090388028360503446/1090388367188967535/IMG_2881.png';
    const joinbg = await loadImage(backgroundImage);
    ctx.drawImage(joinbg, 0, 0, canvas.width, canvas.height);

    const overlayIMG =
      'https://cdn.discordapp.com/attachments/933734336069509190/1060888373809651732/joinoverlay.jpg';
    const overlay = await loadImage(overlayIMG);
    ctx.globalAlpha = 0.5;
    ctx.drawImage(overlay, 0, 0, canvas.width, canvas.height);

    ctx.globalAlpha = 1.0;
    ctx.font = 'Bold 150px Impact';
    ctx.fillStyle = '#F8F8F8';
    ctx.textAlign = 'center';
    ctx.fillText('WELCOME', 750, 280);

    ctx.font = 'Bold 50px Crowden';
    ctx.fillStyle = '#F8F8F8';
    ctx.textAlign = 'left';
    ctx.fillText(member.user.tag.toUpperCase(), 480, 350);

    ctx.beginPath();
    ctx.arc(270, 257, 150, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    const avatar = await loadImage(
      member.user.displayAvatarURL({ extension: 'jpg', size: 512 })
    );
    ctx.drawImage(avatar, 100, 100, 340, 340);

    const attachment = new AttachmentBuilder(canvas.toBuffer(), {
      name: 'welcomecard.png'
    });

    /*
			channel.send({
			content: `**WELCOME TO ${member.guild.name.toUpperCase()} ${member}**`,
          files: [attachment]
		});
	*/
    try {
      

      channel.send({
          content: `**WELCOME TO ${member.guild.name.toUpperCase()} ${member}**`,
          files: [attachment]
        });
      

    } catch (error) {
      console.error(
        chalk.red(
          'Something went wrong while executing guild member add event.\n',
          error
        )
      );
    }
  }
};
