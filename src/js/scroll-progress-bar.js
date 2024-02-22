'use strict'
var updateProgressBar=function()
{
	const
	bar=document.querySelector('.scroll-progress-bar'),
	page=document.querySelector('html'),
	{offsetHeight,scrollHeight,scrollTop}=page,
	h=scrollHeight-offsetHeight,
	y=scrollTop,
	percent=y/h*100,
	w=Math.round(percent)

	bar.setAttribute('title',w+'% complete')
	bar.setAttribute('style','background-size: '+w+'% 100%')
}
onresize=updateProgressBar
onscroll=updateProgressBar