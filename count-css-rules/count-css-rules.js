function countCSSRules() {
    var log = "";
    var totalSelectorCount = 0, totalRuleCount = 0, totalSheetCount = 0;

    if (!document.styleSheets) {
        return;
    }
    
    //loop through all the sheets
    for (var i = 0; i < document.styleSheets.length; i++) {
        var sheet = document.styleSheets[i];

        //only return local domain files
        if (sheet.href && (sheet.href.indexOf(document.domain) > 0)) {
            var log;
            var selectorCount = 0, ruleCount = 0;
            var selectorCountMQ = 0, ruleCountMQ = 0;

            //outer loop thru all rules
            if (sheet.rules) {
                for (var j = 0; j < sheet.rules.length; j++) {
                    var rule = sheet.rules[j];

                    if (rule) {
                        if (rule.selectorText) {
                            selectorCount += rule.selectorText.split(',').length;
                            ruleCount += rule.cssText.split(";").length - 1;
                        } else if (rule.cssRules) {
                             //inner loop for media queries (they have their own set of cssRules)
                            for (var k = 0; k < rule.cssRules.length; k++) {
                                var rule2 = rule.cssRules[k];
                                if (rule2) {
                                    if (rule2.selectorText) {
                                        selectorCountMQ += rule2.selectorText.split(',').length;
                                        ruleCountMQ += rule2.cssText.split(";").length - 1;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            totalSelectorCount += selectorCount + selectorCountMQ;
            totalRuleCount += ruleCount + ruleCountMQ;
            totalSheetCount ++;

            log += '\nFile: ' + (sheet.href ? sheet.href : 'inline <style> tag');
            log += '\nSelectors: ' + (selectorCount + selectorCountMQ) + ' [' + selectorCount + '; MQ: ' + selectorCountMQ + ']';
            log += '; Rules: ' + (ruleCount + ruleCountMQ) + ' [' + ruleCount + '; MQ: ' + ruleCountMQ + ']';
            log += '\n--------------------------';
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
