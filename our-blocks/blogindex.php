<?php pageBanner(array('title' => 'Welcome to our Blog!', 'subtitle' => 'See what is going on in world.'));
?>

<div class="container container--narrow page-section">
  <?php
  while (have_posts()) {
    the_post(); ?>

    <div class="post_item">
      <h2 class=" headline headline--medium headline--post--title"><a href="<?php the_permalink(); ?>"><?php the_title() ?></a></h2>
      <div class="meta-box">
        <p>Posted by <?php the_author_posts_link() ?> on <?php the_time('n.j.y') ?> in <?php echo get_the_category_list(', ');?> </p>
      </div>
      <div class="generic-content">
        <?php the_excerpt() ?>
        <p><a href="<?php the_permalink(); ?>" class="btn btn--blue">Continue reading &raquo;</a></p>
      </div>
    </div>
  <?php
  }
  echo paginate_links();
  ?>
</div>
