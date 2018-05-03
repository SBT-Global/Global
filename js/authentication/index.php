<?php if (!defined('ABSPATH')) die('No direct access allowed'); ?>
<?php

//AJAX callbacks
add_action('wp_ajax_app_authentication_user_logout', array('TMM_Ext_Authentication', 'user_logout'));
add_action('wp_ajax_nopriv_app_authentication_user_login', array('TMM_Ext_Authentication', 'user_login'));
add_action('wp_ajax_app_authentication_user_login', array('TMM_Ext_Authentication', 'user_login'));
add_action('wp_ajax_nopriv_app_authentication_user_register', array('TMM_Ext_Authentication', 'user_register'));

class TMM_Ext_Authentication {

	public static function get_application_path() {
		return TMM_EXT_PATH . '/authentication';
	}

	public static function get_application_uri() {
		return TMM_EXT_URI . '/authentication';
	}

	public static function draw_auth_panel() {
		$show_user_panel = TMM::get_option('show_auth_panel', TMM_APP_CARDEALER_PREFIX);
		if($show_user_panel === '0'){
			return '';
		}
		$data = array();
		return TMM::draw_free_page(self::get_application_path() . '/views/auth_panel.php', $data);
	}

	public static function user_logout() {
		wp_logout();
	}

	public static function user_login() {
		$user_login = trim($_REQUEST['user_login']);
		$user_pass = trim($_REQUEST['user_pass']);
		//*****
		if (wp_authenticate($user_login, $user_pass)) {
			$credentials['user_login'] = $user_login;
			$credentials['user_password'] = $user_pass;
			$credentials['remember'] = true;
			$user = wp_signon($credentials, false);
			if (is_wp_error($user))
				wp_die(__('Wrong data', 'cardealer'));
			else
				echo 1;
			exit;
		}
		
		
		wp_die(__('Wrong data', 'cardealer'));
	}

	public static function user_register() {
		$user_name = trim($_REQUEST['user_name']);
		$user_email = trim($_REQUEST['user_email']);

		if (!is_email($user_email)) {
			_e('Wrong email!', 'cardealer');
			exit;
		}

		$user_id = username_exists($user_name);
		if (!$user_id AND email_exists($user_email) == false) {
			$random_password = wp_generate_password();
			$user_id = wp_create_user($user_name, $random_password, $user_email);
			wp_update_user(array('ID' => $user_id, 'role' => TMM_Cardealer_User::get_default_user_role()));
			//*****
			if (class_exists('TMM_Ext_Mail_Subscriber')) {
				update_user_option($user_id, THEMEMAKERS_APP_MAIL_SUBSCRIBER_PREFIX . 'user_group', TMM_Ext_Mail_Subscriber::get_users_groups());
			}

			$subject = __("User registration", 'cardealer');
			$message = TMM::get_option('new_user_email', TMM_APP_CARDEALER_PREFIX);

			if (empty($message)) {
				global $tmm_config;
				$message = $tmm_config['emails']['create_user'];
			}

			$message = str_replace(
				array('__USER__', '__USERNAME__', '__PASSWORD__'),
				array($user_name, $user_name, $random_password),
				$message );

			TMM_Cardealer_User::send_email($user_email, $subject, $message);
			_e('Login details have been emailed to you, please check your mailbox.', 'cardealer');
			exit;
		}

		printf(__('User already exists. Please try different username or process with "Forgot your password" option. <a href="%s">Reset password</a>', 'cardealer'), site_url('wp-dashboard_home_layout.php?action=lostpassword', 'login'));
		exit;
	}

}
