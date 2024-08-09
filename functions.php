<?php
require get_theme_file_path('/inc/search-route.php');

function pageBanner($args = NULL)
{
    if (!isset($args['title'])) {
        $args['title'] = get_the_title();
    }

    if (!isset($args['subtitle'])) {
        $args['subtitle'] = get_field('page_banner_subtitle');
    }

    if (!isset($args['photo'])) {
        if (get_field('page_banner_background') && !is_archive() && !is_home()) {
            $args['photo'] = get_field('page_banner_background')['sizes']['pageBanner'];
        } else {
            $args['photo'] = get_theme_file_uri('/images/ocean.jpg');
        }
    }
?>
    <div class="page-banner">
        <div class="page-banner__bg-image" style="background-image: url(<?php echo esc_url($args['photo']); ?>)"></div>
        <div class="page-banner__content container t-center c-white">
            <h1 class="page-banner__title"><?php echo esc_html($args['title']); ?></h1>
            <div class="page-banner__intro">
                <p><?php echo esc_html($args['subtitle']); ?></p>
            </div>
        </div>
    </div>
<?php
}

function university_files()
{
    wp_enqueue_style('university_main_styles', get_theme_file_uri('/build/style-index.css'));
    wp_enqueue_style('university_extra_styles', get_theme_file_uri('/build/index.css'));
    wp_enqueue_style('font_awesome', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css', [], null);
    wp_enqueue_script('main-university-js', get_theme_file_uri('/build/index.js'), array('jquery'), 1.0, true);
    wp_localize_script('main-university-js', 'universityData', array(
        'root_url' => get_site_url(),
        'nonce' => wp_create_nonce('wp_rest')
    ));
}
add_action('wp_enqueue_scripts', 'university_files');

function university_features()
{
    register_nav_menu('headerMenuLocation', __('Header Menu Location', 'your-text-domain'));
    register_nav_menu('FooterLocation1', __('Footer Location 1', 'your-text-domain'));
    register_nav_menu('FooterLocation2', __('Footer Location 2', 'your-text-domain'));

    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_image_size('prof-landscape', 400, 260, true);
    add_image_size('prof-potrait', 480, 650, true);
    add_image_size('pageBanner', 1500, 350, true);
    add_theme_support('editor-styles');
    add_editor_style(array('build/style-index.css', 'build/index.css'));
}

add_action('after_setup_theme', 'university_features');

function university_custom_rest()
{
    register_rest_field('post', 'authorName', array(
        'get_callback' => function () {
            return get_the_author();
        }
    ));
    register_rest_field('note', 'userNoteCount', array(
        'get_callback' => function () {
            return count_user_posts(get_current_user(), 'note');
        }
    ));
}
add_action('rest_api_init', 'university_custom_rest');

function university_adjust_queries($query)
{
    $today = date('Ymd');
    if (!is_admin() && is_post_type_archive('event') && $query->is_main_query()) {
        $query->set('orderby', 'meta_value_num');
        $query->set('order', 'ASC');
        $query->set('meta_key', 'event_date');
        $query->set('meta_query', array(
            array(
                'key' => 'event_date',
                'compare' => '>=',
                'value' => $today,
                'type' => 'numeric'
            )
        ));
    }
    if (!is_admin() && is_post_type_archive('program') && $query->is_main_query()) {
        $query->set('orderby', 'title');
        $query->set('order', 'ASC');
        $query->set('posts_per_page', -1);
    }
}
add_action('pre_get_posts', 'university_adjust_queries');

// Redirect subscribers to website
function redirectSubToFrontend()
{
    $ourCurrentUser = wp_get_current_user();
    if (count($ourCurrentUser->roles) == 1 && $ourCurrentUser->roles[0] == 'subscriber') {
        wp_redirect(site_url('/'));
        exit();
    }
}
add_action('admin_init', 'redirectSubToFrontend');

// Hide the admin bar
function noSubsAdminBar()
{
    $ourCurrentUser = wp_get_current_user();
    if (count($ourCurrentUser->roles) == 1 && $ourCurrentUser->roles[0] == 'subscriber') {
        show_admin_bar(false);
    }
}
add_action('wp_loaded', 'noSubsAdminBar');

// Sign in/Sign up screen customizations
add_filter('login_headerurl', 'ourHeaderUrl');
function ourHeaderUrl()
{
    return esc_url(site_url('/'));
}

function ourLoginCSS()
{
    wp_enqueue_style('university_main_styles', get_theme_file_uri('/build/style-index.css'));
    wp_enqueue_style('university_extra_styles', get_theme_file_uri('/build/index.css'));
    wp_enqueue_style('font_awesome', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css', [], null);
    wp_enqueue_script('main-university-js', get_theme_file_uri('/build/index.js'), array('jquery'), 1.0, true);
}
add_action('login_enqueue_scripts', 'ourLoginCSS');

add_filter('login_headertext', 'ourLoginTitle');
function ourLoginTitle()
{
    return 'University Login';
}

// Make notes private by default
add_filter('wp_insert_post_data', 'makeNotePrivate', 10, 2);
function makeNotePrivate($data, $postarr)
{
    if ($data['post_type'] == 'note') {
        if (count_user_posts(get_current_user_id(), 'note') > 4 && !$postarr['ID']) {
            die("You have reached the limit");
        }
        $data['post_title'] = sanitize_text_field($data['post_title']);
        $data['post_content'] = sanitize_textarea_field($data['post_content']);
    }
    if ($data['post_type'] == 'note' && $data['post_status'] != 'trash') {
        $data['post_status'] = "private";
    }
    return $data;
}

class JSXBlock
{
    public $name;
    public $renderCallback;
    function __construct($name,$renderCallback=null)
    {
        $this->name = $name;
        $this->renderCallback = $renderCallback;
        add_action('init', [$this, 'onInit']);
    }

    function ourRenderCallback($attributes,$content){
    ob_start();
    require get_theme_file_path("/our-blocks/{$this->name}.php");
    return ob_get_clean();
    }
    function onInit()
    {
        wp_register_script($this->name, get_stylesheet_directory_uri() . "/build/{$this->name}.js", array('wp-blocks', 'wp-editor'), null, true);
        $ourArgs = array(
            'editor_script' => $this->name
        );
        if($this->renderCallback){
            $ourArgs['render_callback'] = [$this,'ourRenderCallback'];
        }
        register_block_type("ourblocktheme/{$this->name}", $ourArgs);
    }
}
new JSXBlock("banner",true);
new JSXBlock("genericheader");
new JSXBlock("genericbutton");

