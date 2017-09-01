import plugins from '../plugins/manifest'
// We search comment strings for these commands and assemble all the data that the
// handler will need to process the bot summons
// Each plugin contains the methods for doing each of these things
// and we just access those plugins through the plugin manifest
export function detectTrigger(comment){
    // Default to null incase we find nothin
    let lastTriggerDetected = null;
    // Check through our list of plugins
    plugins.list.forEach(plugin => {
        // Check for existance of plugin
        if( typeof plugins.provider[plugin] === 'undefined' )
            console.error('Plugin hasn\'t been set up properly', plugin, plugins);
        // Check if trigger is set on plugin
        if( typeof plugins.provider[plugin].trigger === 'undefined' || typeof plugins.provider[plugin].trigger(comment) === 'undefined' )
            console.error('Plugin trigger hasn\'nt been created proplery', plugin, plugins);
        // If we find a trigger
        if( typeof plugins.provider[plugin].trigger === 'function' && plugins.provider[plugin].trigger(comment) === true ){
            // return the data structure required for the trigger
            lastTriggerDetected = plugins.provider[plugin].command(comment)
        }
    })
    return lastTriggerDetected
}
