import { component$ } from '@builder.io/qwik'

type Props = {
  shortname: string,
  identifier: string,
  url: string,
  title: string,
}

/*
<script>
  var disqus_config = function () {
    this.page.url = url;
    this.page.identifier = identifier;
    this.page.title = title;
  };
  (function() {
    var d = document, s = d.createElement('script');
    s.src = 'https://' + shortname + '.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
  })();
</script>
*/

export default component$<Props>(() => (
  <>
    <div id="disqus_thread"></div>
  </>
))
