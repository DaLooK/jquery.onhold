# jquery.onhold
Quick and dirty fix for triggering on hold events with velocity.

### I just tested this code like 30 minutes just before uploading it, if it breaks your code (or computer), it's not my fault.
### And by that I mean, this code comes without any warranty. Use it at your own risk.

# Usage
Use the '.onHold' function on the element you want to have repetitive on hold events.

The following code is an example of the usage on an element with ID `my-button`

	$('#my-button').onHold(function() {
		console.log("Quack");
	});

This code will run the function in there `onHold` parameter every tick (more explaniation later).

To remove the on hold events you just need to call the `onHold` method without parameters, like so:

	$('#my-button').onHold();
	
This way you can enable/disable the on hold events.

# Customization
These are the variables used to control the functionality and a brief explanation:

	$.fn.extend({
		velocityControlTimeoutId: 0,	//Keeps the id of the current Timeout object running (or the last one)
		velocitySlowTimeout: 250,	//Time in milliseconds used when slow ticking
		velocityFastTimeout: 50,	//Time in milliseconds used when fast ticking
		velocityTicksBeforeFast: 3,	//Number of slow ticks before fast ticking
		velocityTicksCount: 0,		//Number of ticks done (only count enough for fast ticking)
		makeTimeout: /*A function*/,	//Function used to call the `onHoldCallback` function, increasing the ticks done, and decide whether fast tick or slow tick
		onHoldCallback: $.noop(),	//Function called when a tick is done (by default is an empty function)
		onHold: /*A function*/		//This method activates the on hold events on the element (jQuery object)
	});
	
Using the variables from above you can customize the triggers to behave different.

### But!
There a caveat. At this moment, you cannot use different timeout speeds (`velocityFastTimeout`/`velocitySlowTimeout`) on different objects. All objects will use the same speed.

## Examples
Making the slow ticks a little bit slower
	
	$.fn.velocitySlowTimeout = 500; //This will make the ticks trigger every 500ms
	
Wait more ticks before fast ticking

	$.fn.velocityTicksBeforeFast = 20; //Will wait 20 ticks before fast ticking
	
Fast counting

	$.fn.velocitySlowTimeout = 50;		//Use 50ms for slow ticking
	$.fn.velocityTicksBeforeFast = 10;	//Tick 10 time before fast ticking
	$.fn.velocityFastTimeout = 2;		//Tick every 2ms when fast ticking
	
# That's it
Maybe it's not the most elaborate readme, but maybe will do the job.
After all, I made this because I couldn't find any 'fast' way to do it.
