<?php
/**
 * Profile page
 *
 * @package mappers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/*
	Template Name: Profile
	Template Post Type: page
*/

$user_id = get_current_user_id();

$show_form = false;

if ( is_super_admin() ) {
	$show_form = true;
}
if ( ! $user_id ) {
	$show_form = true;
}

$profile_tab = get_query_var( 'profile_tab' );

if ( $profile_tab && ! in_array( $profile_tab, array( 'password', 'delete' ), true ) && ! $show_form ) {
	mappers_force_404();
}

?>
<?php get_header(); ?>
<?php the_post(); ?>
<main class="mappers-page-main">
	<div class="mappers-container">
		<h1 class="mappers-page-title mappers-h1">
			<?php the_title(); ?>
		</h1>
		<div class="mappers-profile">
			<?php
				$nav = array(
					array(
						'href'  => '',
						'title' => 'Особисті дані',
						'icon'  => 'profile-info',
					),
					array(
						'href'  => 'Coming soon',
						'title' => __( 'Віджети', 'mappers' ),
						'icon'  => 'widget',
					),
					array(
						'href'  => 'password',
						'title' => __( 'Зміна пароля', 'mappers' ),
						'icon'  => 'profile-password',
					),
					array(
						'href'  => 'delete',
						'title' => __( 'Видалити профіль', 'mappers' ),
						'icon'  => 'trash',
					),
				);
				?>
			<nav class="mappers-profile-nav">
				<ul class="mappers-profile-menu">
					<?php foreach ( $nav as $item ) : ?>
						<li class="<?php echo $item['href'] === $profile_tab ? 'mappers-active' : ''; ?>">
							<?php if ( 'Coming soon' === $item['href'] ) : ?>
								<div class="mappers-profile-menu-link">
									<svg class="mappers-icon"><use xlink:href="#icon-<?php echo esc_attr( $item['icon'] ); ?>"/></svg>
									<span><?php echo esc_html( $item['title'] ); ?></span>
									<i>Coming soon</i>
								</div>
							<?php else : ?>
								<a href="<?php echo esc_url( get_the_permalink() . $item['href'] ); ?>" class="mappers-profile-menu-link">
									<svg class="mappers-icon"><use xlink:href="#icon-<?php echo esc_attr( $item['icon'] ); ?>"/></svg>
									<span><?php echo esc_html( $item['title'] ); ?></span>
								</a>
							<?php endif; ?>
						</li>
					<?php endforeach; ?>
				</ul>
			</nav>
			<div class="mappers-profile-body">
				<?php
				if ( 'delete' === $profile_tab ) :
					elseif ( 'password' === $profile_tab ) :
					else :
						$mappers_name     = carbon_get_user_meta( $user_id, 'mappers_name' );
						$mappers_tel      = carbon_get_user_meta( $user_id, 'mappers_tel' );
						$mappers_website  = carbon_get_user_meta( $user_id, 'mappers_website' );
						$mappers_telegram = carbon_get_user_meta( $user_id, 'mappers_telegram' );
						$mappers_facebook = carbon_get_user_meta( $user_id, 'mappers_facebook' );
						?>
				<?php endif; ?>
			</div>
		</div>
	</div>
</main>
<?php
get_footer();
