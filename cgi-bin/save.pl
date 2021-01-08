#! /usr/bin/perl
print "Content-Type: text/html; charset=utf-8\n\n";

use CGI;

my $q = CGI->new;
my $foo = $q->param('POSTDATA');

open(SAVE, ">../save.js");

#print SAVE $q->header;
print SAVE $foo;

close(SAVE);

