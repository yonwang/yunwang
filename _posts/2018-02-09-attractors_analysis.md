---
layout: post
published: true
resource_folder: 'post'
type: 'Blog'
subject: 'attractors_analysis'
title: 'attractors_analysis'
category: 'LeeL Blog'
image: 'post_blog.jpg'
author: ''
---
<div><div>% regulation network
</div><div>down(a,b).
</div><div>down(b,c).
</div><div>up(c,d).
</div><div><br/></div><div>% state markers
</div><div>statemarker(a,b,c,d).
</div><div><br/></div><div>% all difference expression
</div><div>%unit(a,low).
</div><div>%unit(a,high).
</div><div>%unit(b,low).
</div><div>%unit(b,high).
</div><div>%unit(c,low).
</div><div>%unit(c,high).
</div><div>%unit(d,low).
</div><div>%unit(d,high).
</div><div><br/></div><div>%specific difference expression
</div><div>unit(a,high).
</div><div>unit(c,low).
</div><div><br/></div><div>% get the states of the proteins in process
</div><div>unit(Y,high):-down(X,Y),unit(X,low).
</div><div>unit(Y,low):-down(X,Y),unit(X,high).
</div><div>unit(Y,low):-up(X,Y),unit(X,low).
</div><div>unit(Y,high):-up(X,Y),unit(X,high).
</div><div><br/></div><div>process(unit(X,low),unit(Y,high)):-down(X,Y),unit(X,low).
</div><div>process(unit(X,high),unit(Y,low)):-down(X,Y),unit(X,high).
</div><div>process(unit(X,low),unit(Y,low)):-up(X,Y),unit(X,low).
</div><div>process(unit(X,high),unit(Y,high)):-up(X,Y),unit(X,high).
</div><div><br/></div><div><br/></div><div>%construct state space
</div><div>state(unit(X1,Y1),unit(X2,Y2),unit(X3,Y3),unit(X4,Y4)):-statemarker(X1,X2,X3,X4),unit(X1,Y1),unit(X2,Y2),unit(X3,Y3),unit(X4,Y4).
</div><div><br/></div><div><br/></div><div>% to get the transfer relationship between states 
</div><div>transfer(difference(X1,Y1),state(X1,X2,X3,X4),state(Y1,Y2,Y3,Y4)):-state(X1,X2,X3,X4),state(Y1,Y2,Y3,Y4),X1!=Y1,X2=Y2,X3=Y3,X4=Y4.
</div><div>transfer(difference(X2,Y2),state(X1,X2,X3,X4),state(Y1,Y2,Y3,Y4)):-state(X1,X2,X3,X4),state(Y1,Y2,Y3,Y4),X1=Y1,X2!=Y2,X3=Y3,X4=Y4.
</div><div>transfer(difference(X3,Y3),state(X1,X2,X3,X4),state(Y1,Y2,Y3,Y4)):-state(X1,X2,X3,X4),state(Y1,Y2,Y3,Y4),X1=Y1,X2=Y2,X3!=Y3,X4=Y4.
</div><div>transfer(difference(X4,Y4),state(X1,X2,X3,X4),state(Y1,Y2,Y3,Y4)):-state(X1,X2,X3,X4),state(Y1,Y2,Y3,Y4),X1=Y1,X2=Y2,X3=Y3,X4!=Y4.
</div><div><br/></div><div>% to get the attractor landscape
</div><div>directlink(state(X1,X2,X3,X4),change(X,Y),state(Y1,Y2,Y3,Y4)):-transfer(difference(X,Y),state(X1,X2,X3,X4),state(Y1,Y2,Y3,Y4)),process(Z,Y).
</div><div><br/></div><div>% to get attractors using neo4j</div></div>