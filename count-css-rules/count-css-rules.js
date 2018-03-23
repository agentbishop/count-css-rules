function countCSSRules() {
    var log = '',
        totalSelectorCount = 0, 
        totalRuleCount = 0, 
        totalSheetCount = 0;

    if (!document.styleSheets) {
        return;
    }
    
    for (var i = 0; i < document.styleSheets.length; i++) {
        countSheet(document.styleSheets[i]);
    }
    
    function countSheet(sheet) {
        var selectorCount = 0, 
            ruleCount = 0;
        if (sheet.href && (sheet.href.indexOf(document.domain) > 0)) {

            if (sheet && sheet.cssRules) {
                for (var j = 0, l = sheet.cssRules.length; j < l; j++) {
                    if( !sheet.cssRules[j].selectorText) {
                        continue;
                    }
                    selectorCount += sheet.cssRules[j].selectorText.split(',').length;
                    ruleCount += sheet.cssRules[j].cssText.split(";").length - 1;
                }

                totalSelectorCount += selectorCount;
                totalRuleCount += ruleCount;
                totalSheetCount ++;

                log += '\nFile: ' + (sheet.href ? sheet.href : 'inline <style> tag');
                log += '\nSelectors: ' + selectorCount;
                log += ', Rules: ' + ruleCount;
                log += '\n--------------------------';
            }
        }
    }
    console.log(log);

    console.log('** TOTALS **');
    console.log('Total Sheet Count: ' + totalSheetCount);
    console.log('Total Selector Count:' + totalSelectorCount);
    console.log('Total Rule Count:' + totalRuleCount);
    console.log('Finished.');
};
countCSSRules();
