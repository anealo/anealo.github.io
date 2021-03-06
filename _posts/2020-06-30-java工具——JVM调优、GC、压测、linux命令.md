---
layout:     post
title:      java工具——JVM调优、GC、压测、linux命令
subtitle:   JVM调优、GC、压测、linux命令
date:       2020-06-30
author:     ispotu
header-img: img/jvm.jpg
catalog: true
tags:
    - jvm
---

**jmap**

jdk自带命令。jmap是一个多功能的命令，查看JVM内存使用情况。它可以生成 java 程序的 dump 文件， 也可以查看堆内对象示例的统计信息、查看 ClassLoader 的信息以及 finalizer 队列。

```linux
jmap -dump:live,format=b,file=myjmapfile.txt 19570
```

**jstack**

jdk自带命令。查看运行java程序的java stack和native stack的信息。

```
jstack pid
```

**jstat**

jdk自带命令。可以观察到classloader，compiler，gc相关信息。可以时时监控资源和性能 。

**MAT**

第三方堆栈文件分析工具。下载地址：https://www.eclipse.org/mat/

**jps**

jdk自带命令。查看JVM中运行的进程状态信息。

```
jps [options] [hostid]
```

**jhat**

jdk内置的工具之一。主要是用来分析java堆的命令。可以将堆中的对象以html的形式显示出来，包括对象的数量，大小等等，并支持对象查询语言。使用jmap等方法生成java的堆文件后，使用其进行分析。

**jinfo**
输出jvm各项参数信息，包括默认参数
Jinfo [option] pid

**jstatd**
虚拟机的jstat守护进程，主要用于监控JVM的创建与终止，并提供一个接口允许远程监控工具依附到在本地主机上运行的JVM。
jstatd工具是一个RMI服务器应用程序，主要用于监控HotSpot Java 虚拟机的创建与终止，并提供一个接口以允许远程监控工具附加到本地主机上运行的JVM上。jstatd位于 $JAVA_HOME/bin目录下
jstatd服务器需要在本地主机上存在一个RMI注册表。
**jdb**
jdk自带工具。 JDB是 The Java Debugger 的简称，它可以在命令行下调试Java程序。在JDK自己的bin目录下。

**hprof**

JDK自带一个简单的性能分析工具。常被用于内存使用情况分析。它是一个动态链接库文件，监控CPU的1使用率、内存堆栈分配情况等。使用命令行格式为：

```
java -Xrunhprof ToBeProfiledClass
```

有两种分析方法：内存分配历史的跟踪记录（dump）和将占用内存的对象进行排序（sites）。命令行如下

```
java -Xrunhprof:heap=all|dump|sites ToBeProfiledClass
```

**Java VisualVM**（**jvisualvm**）

即jvisualvm，Netbeans的profile子项目，已在JDK6.0 update 7 中自带，能够监控线程，内存情况，查看方法的CPU时间和内存中的对 象，已被GC的对象，反向查看分配的堆栈。Jvisualvm动态分析jvm内存情况和gc情况，插件：visualGC.

在JDK_HOME/bin(默认是C:\Program Files\Java\jdk1.6.0_13\bin)目录下面，有一个jvisualvm.exe文件，双击打开。启动起来后和jconsole 一样同样可以选择本地和远程，如果需要监控远程同样需要配置相关参数。

**ab 、abs**

ab是apache 推出的压力测试工具，可以用来测试http服务器的性能，得出QPS。全称：Apache HTTP server benchmarking tool

abs 则是apache 推出的压力测试工具，可以用来测试https服务器的性能，得出QPS
工具下载地址：https://www.apachehaus.com/cgi-bin/download.plx
工具官方文档地址：http://httpd.apache.org/docs/2.4/programs/ab.html
用法简介：下载工具进入Apache24/bin目录下载就可以看到ab.exe和abs.exe
在命令行中输入

```
ab -n 1000 -c 20 http://127.0.0.1:8080/
```

-n 要发多少个请求数
-c 每次进行多少请求
注意：必须是 http://127.0.0.1:8080/ ，“/” 不可以被省略，测试地址必须是一个url。

**jconsole**
jdk自带命令。可视化监控jvm

**gc log**

gc时打印出来的日志。

在jvm启动参数加上以下，可以开启gc log,配置gclog的输出位置

```java
-XX:+PrintGCDateStamps -XX:+PrintGCDetails -Xloggc:/usr/local/project/jvmtest/gc.log
```

**jcmd**

在JDK1.7以后新增的一个命令行工具。可以用它来导出堆、查看Java进程、导出线程信息、执行GC、还可以进行采样分析（jmc 工具的飞行记录器）。

**GCViewer**
日志可视化分析工具。
下载地址：http://www.tagtraum.com/gcviewer.html

**GCHisto**

日志分析工具。

下载：http://java.net/projects/gchisto
直接点击gchisto.jar就可以运行，点add载入gc.log

**GCLogViewer**

日志分析工具。

下载：http://code.google.com/p/gclogviewer/
点击run.bat运行
整个过程gc情况的趋势图，还显示了gc类型，吞吐量，平均gc频率，内存变化趋势等
Tools里还能比较不同gc日志

**HPjmeter**
日志分析工具。
下载地址： http://www.hp.com/go/java
工具很强大，但只能打开由以下参数生成的GC log， -verbose:gc -Xloggc:gc.log,添加其他参数生成的gc.log无法打开。

**garbagecat**

日志分析工具。

http://code.google.com/a/eclipselabs.org/p/garbagecat/wiki/Documentation

**Jprofiler**

JProfiler是由ej-technologies GmbH公司开发的一款性能瓶颈分析工具.

下载：https://www.ej-technologies.com/products/jprofiler/overview.html

**GCeasy**
一款超好用的在线分析GC日志的网站
网址：https://www.gceasy.io/

**jpda**
java远程调试工具。JPDA（Java Platform Debugger Architecture）是Java平台调试体系结构的缩写。由3个规范组成，分别是JVMTI(JVM Tool Interface)，JDWP(Java Debug Wire Protocol)，JDI(Java Debug Interface) 。

**top**

linux命令。实时显示正在执行进程的 CPU 使用率、内存使用率以及系统负载等信息。

```
top Hp pid
```

查看具体线程使用系统资源情况

**vmstat**

linux命令。监测指定采样周期和次数。它不仅可以统计内存的使用情况，还可以观测到 CPU 的使用率、swap 的使用情况。但 vmstat 一般很少用来查看内存的使用情况，而是经常被用来观察进程的上下文切换。Virtual Meomory Statistics（虚拟内存统计）的缩写，可对操作系统的虚拟内存、进程、CPU活动进行监控。

**pidstat**

linux命令。pidstat是 Sysstat 中的一个组件；可以通过yum install sysstat 安装该监控组件。pidstat 命令则是深入到线程级别的监测工具。

**gdb**
linux命令。是一个由GNU开源组织发布的、UNIX/LINUX操作系统下的、基于命令行的、功能强大的程序调试工具。

**nmon**
Linux工具。很轻松的监控Linux系统的 CPU、内存、网络、硬盘、文件系统、NFS、高耗进程、资源和 IBM Power 系统的微分区的信息）。
下载：http://nmon.sourceforge.net/pmwiki.php?n=Site.Downlo



**JMeter**
Apache JMeter为一款广为流传的开源压测产品，最初被设计用于Web应用测试，如今JMeter可以用于测试静态和动态资源，例如静态文件、Java 小服务程序、CGI 脚本、Java 对象、数据库、FTP服务器等等，还能对服务器、网络或对象模拟巨大的负载，通过不同压力类别测试它们的强度和分析整体性能。另外，JMeter能够对应用程序做功能测试和回归测试，通过创建带有断言的脚本来验证你的程序返回了你期望的结果。为了最大限度的灵活性，JMeter允许使用正则表达式创建断言。
JMeter的特点包括对HTTP、FTP服务器、数据库进行压力测试和性能测试；完全的可移植性；完全 Swing和轻量组件支持包；完全多线程；缓存和离线分析/回放测试结果；可链接的取样器；具有提供动态输入到测试的功能；支持脚本编程的取样器等。在设计阶段，JMeter能够充当HTTP PROXY（代理）来记录浏览器的HTTP请求，也可以记录Apache等WebServer的log文件来重现HTTP流量，并在测试运行时以此为依据设置重复次数和并发度（线程数）来进行压测。

类似的压测工具还有：LoadRunner、NeoLoad、WebLOAD、Loadster、Load impact、CloudTest、Loadstorm、阿里云PTS、压测宝、
更多压测工具详情：https://blog.csdn.net/langzitianya/article/details/81479422

**sar**
linux命令。（System Activity Reporter 系统活动情况报告）是目前 Linux 上最为全面的系统性能分析工具之一，可以从多方面对系统的活动进行报告，包括：文件的读写情况、系统调用的使用情况、磁盘 I/O、CPU 效率、内存使用状况、进程活动及 IPC 有关的活动等。


**free** 
linux命令。显示系统内存的使用情况，包括物理内存、交换内存(swap)和内核缓冲区内存。

**iostat**
linux命令。是I/O statistics（输入/输出统计）的缩写，iostat工具将对系统的磁盘操作活动进行监视。它的特点是汇报磁盘活动统计情况，同时也会汇报出CPU使用情况。iostat也有一个弱点，就是它不能对某个进程进行深入分析，仅对系统的整体情况进行分析。iostat属于sysstat软件包。可以用yum直接安装。


**tee**
linux命令用于读取标准输入的数据，并将其内容输出成文件。
tee指令会从标准输入设备读取数据，将其内容输出到标准输出设备，同时保存成文件。

