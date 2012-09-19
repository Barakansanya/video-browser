#!/usr/bin/python27

#Description:
# This program updates the vb by removing certain files/folders which were clogging it up and making it really big.
# Specifically, there are folders associated with certain playlists in the 'All.html' which aren't relevant.
# More specifically, and only if you're still reading this, it removes the associated subfolders in the video folder, and the html folder.

#Instructions:
#1. Place this in the main folder (which contains index.html)
#2. Run it using the terminal or IDLE. As a suggestion, open the terminal, navigate to the folder using the cd command, and type 'python rm_videos.py'

import shutil
[(shutil.rmtree('./videos/'+f),shutil.rmtree('./html/'+f)) for f in ['microeconomics-macroeconomics', 'algebra-matrices', 'venture-capital-and-capital-markets', 'talks-and-interviews', 'geithner-plan', 'singapore-math', 'core-finance', 'currency', 'iit-jee', 'data-sufficiency', 'sat-math', 'american-civics', 'current-economics', 'credit-crisis', 'problem-solving', 'history', 'valuation-and-investing', 'banking-and-money', 'paulson-bailout']]
