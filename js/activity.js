var activity = function(config) {
    var self = this;

    self.git = new git(config);

    self.messages = [];

    self.options = {
        issue_total_num:0,
        issue_show_num:0,
        page:1,
        icon_num:0
    }

    var message = function(issue_content, issue_id) {
        this.data = issue_content;
        this.id = issue_id;
    }

    message.prototype = {
        init: function() {
            this.data.created_at = self.utc2localTime(this.data.created_at);
            document.getElementById('message-list').innerHTML += this.data.body;
        }
    }

    self.utc2localTime = function(time) {
        var time_string_utc_epoch = Date.parse(time);
        var unixTimestamp = new Date(time_string_utc_epoch);
        var year = unixTimestamp.getFullYear();
        var month = unixTimestamp.getMonth() + 1;
        var date = unixTimestamp.getDate();
        var hour = unixTimestamp.getHours();
        var minute = unixTimestamp.getMinutes();
        var second = unixTimestamp.getSeconds();
        hour = (hour<10)?'0'+hour:hour;
        minute = (minute<10)?'0'+minute:minute;
        second = (second<10)?'0'+second:second;
        return year+'年'+month+'月'+date+'日'+' '+hour+':'+minute+':'+second;
    }

    self.lazyLoad = function(options) {
        if(self.options.issue_show_num >= self.options.issue_total_num) {
            document.getElementById("load_message").innerHTML = "已经到底了~";
        } else {
            document.getElementById("load_message").innerHTML = "加载中……";
            self.git.getIssue(options, function(data) {
                for(var i in data) {
                    var temp_message = new message(data[i], i+1);
                    temp_message.init();
                    self.options.issue_show_num++;
                    self.messages.push(temp_message);
                    document.getElementById("load_message").innerHTML = "";
                }
                self.options.page++;
                ScrollReveal().reveal(".feature",{duration:600,distance:"40px",easing:"cubic-bezier(0.5, -0.01, 0, 1.005)",interval:100,origin:"bottom",viewFactor:.5});
            });
        }
    }

    self.getMessageTotalNum = function() {
        self.git.getIssueNum(function(data) {
            self.options.issue_total_num = data.open_issues_count;
            self.lazyLoad({
                author:config.name,
                page:self.options.page,
                per_page:10,
                type:'markdown'
            });
        });
    }

    self.init = function() {
        self.getMessageTotalNum();
        window.onscroll = function() {
            if($(document).height() == $(window).height() + $(window).scrollTop()) {
                self.lazyLoad({
                    author:config.name,
                    page:self.options.page,
                    per_page:10,
                    type:'markdown'
                });
            }
        }
    }
}

var activity = new activity(
    {
        "name": "hitszqmaker",
        "repo": "hitszqmaker.github.io"
    }
);

activity.init();