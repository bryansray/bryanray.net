---
title: Some Changes to Merb Edge You Should Probably Know About
date: 2008-08-18T19:18:20-05:00
---
While doing a fresh pull of "Merb":http://merbivore.com edge this weekend I realized that all of my forms had suddenly just disappeared and I was also receiving some NoMethod errors; which is never a fun scenario. Just in case you like to develop on edge (and who doesn't when it comes to Merb?) you should probably be aware of a few changes that went through this week.

There was a pretty big refactoring with the form_helpers. In fact, it's still a little flaky at the time of this writing.

**UPDATE**: It has stabilized over the next couple of days and, according to wycats and GMFlash, should become more solid by the next release (0.9.5 at the time of this writing).

Previously in merb there were:

* "_control" controls* - These controls signified that it was going to be "bound" to a specific attribute on a model.
* "_field" controls* - These were controls which were not bound to a model.

This refactor completely eliminates all of that complexity. Now there is only one way helper for each control. *One helper to bring them all and in the darkness bind them*. Sorry I had to do it.

Here are a list of the new helper methods:

* form (previously this was form_tag)
* form_for (This helper will generate a form that is bound to a specific resource (model)
* button
* submit (previously submit_button)
* text_field, password_field, hidden_field file_field, text_area, select, check_box, radio_button, and radio_group

The 'form' and 'form_for' methods now render output so you'll need to prefix it with a %= rather than % and = rather than - if you're using HAML.

The way you bind specific attributes to a model is by simply passing a symbol in to the method. You can see this in the private bound? method in the [helpers.rb](http://github.com/wycats/merb-plugins/tree/master/merb_helpers/lib/merb_helpers/form/helpers.rb#L196) file.

Thank you, sweet baby jesus and GMFlash, for this refactor. It really does simplify views that require forms and makes things much cleaner. Suddenly the form helpers just make much more sense to me.

At the time of this writing there are a couple patches in the pipe:

There a patch in the intertubes that changes the way 'select' works. Here is the [ticket and the patch](http://merb.lighthouseapp.com/projects/7588/tickets/143-select_control-and-select_field-error-when-using-collection-w-one-two-three#ticket-143-8). **UPDATE**: This has been merged in to the refactoring.

Apparently there is a bug in the way the checkbox control sends it's output that does not allow a checked checkbox to ever render a 'true' (1) value.- **UPDATE**: My patched was "merged in":Patch143. You can see the "ticket (and patch) here":Ticket143 at Lighthouse.

## Examples

#### Form Helper (not bound to a model)

```
<% #coderay :lang => "ruby" do %>
<%%= form :action => url(:login) do %>
  <%%= text_field :name => "login", :label => "Username" %>
  <%%= text_field :name => "password", :label => "Password" %>
  <%%= submit "Log in" %>
<%% end =%>
<% #end -%>
```

#### Form Helper (bound to a model)

```
<%# coderay :lang => "ruby" do %>
<%%= form_for @post do %>
  <%%= text_field :title, :label => "Title" %>
  <%%= text_area :body, :label => "Body" %>
  <%%= check_box :published %>
  <%%= submit "Create or Update" %>
<%% end =%>
<%# end -%>
```

* Notice the %= at the beginning and end of the form and form_for methods
* Notice the :symbol being passed in to the control helper methods to signify a "bound" control

##### select helper (bound)

```
<p><% #coderay :lang => "html" do %>
select :foo, :collection => [['0', 'Text Method 1'], ['1', 'Text Method 2' ]]
<%# end -%></p>
```

which should generate something like this:

```
<% #coderay :lang => "html" do %>
<select name="foo">
    <option value="0">Text Method 1</option>
    <option value="1">Text Method 2</option>
</select>
<% #end -%>
```

The above code didn't go through the Ruby interpreter at all. It was all hand typed so please forgive me if there are typos.

As always there is much more that these helper methods are capable of, but it will take some digging around to find. You can always check out the "merb documentation":http://www.merbivore.com/documentation.html, stop by the #merb channel, or dig in to the "merb code":http://github.com/wycats yourself!

[Patch143]http://github.com/wycats/merb-plugins/commit/cc6461712b42bf724c53380c35435f9ff9df9287
[Ticket143]http://merb.lighthouseapp.com/projects/7588/tickets/145-when-submitting-a-form-that-has-checkbox_control-result-is-always-a-0-value#ticket-145-1